require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { pool, testConnection } = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Global flag to track if we should use DB or fallback to JSON
let useDB = false;
let dbError = null;

// Initialize Database Connection
(async () => {
  const connResult = await testConnection();
  if (connResult === true) {
    useDB = true;
  } else {
    useDB = false;
    dbError = connResult;
    console.log('⚠️ Running in fallback mode using JSON files.');
  }
})();

// Security Middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests from this IP, please try again later' }
});

app.use(cors());
app.use(express.json());
app.use('/api', apiLimiter);

// Fallback JSON Paths
const dataFile = path.join(__dirname, 'data.json');
const messagesFile = path.join(__dirname, 'messages.json');
const coursesFile = path.join(__dirname, 'courses.json');
const usersFile = path.join(__dirname, 'users.json');

try {
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify([]));
  if (!fs.existsSync(messagesFile)) fs.writeFileSync(messagesFile, JSON.stringify([]));
  if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, JSON.stringify([]));
} catch (error) {
  console.error('Failed to initialize data files.', error);
}

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  if (useDB) {
    res.status(200).send(`<h1>API is running</h1><p>DB Connected: true</p>`);
  } else {
    res.status(200).send(`<h1>API is running</h1><p>DB Connected: false</p><p style="color: #c2410c; font-family: monospace; background: #fff7ed; padding: 15px; border: 1px solid #fed7aa; border-radius: 10px; max-width: 600px; line-height: 1.5;"><strong>Database Connection Error:</strong><br/>${dbError || 'Unknown connection error'}</p>`);
  }
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET',
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL/TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendConfirmationEmail = async (email, name, course, refNo, paymentStatus, amount, isMessage = false, messageBody = '', extraData = {}) => {
  try {
    const adminEmail = 'algorithmazeai@gmail.com';
    let mailOptions;

    if (isMessage) {
      mailOptions = {
        from: process.env.EMAIL_USER || 'your_email@gmail.com',
        to: adminEmail,
        subject: `New Contact Message from ${name}`,
        html: `<h2>New Contact Inquiry</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${course}</p><p><strong>Message:</strong> ${messageBody}</p>`
      };
    } else {
      const invoiceDate = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const amtPaid = extraData.amountPaid || 0;
      const amtDue = extraData.amountDue || 0;
      const totalFee = Number(amtPaid) + Number(amtDue);
      const isFullPayment = Number(amtDue) === 0 && Number(amtPaid) > 0;
      const isPartPayment = Number(amtPaid) > 0 && Number(amtDue) > 0;
      const isPayOnDay = paymentStatus === 'Pay on Day (Cash)' || extraData.paymentStatus === 'Pay on Day';
      const isFree = paymentStatus === 'Free Registration' || extraData.paymentStatus === 'Free';

      let invoiceStatusBadge = '';
      if (isFullPayment) {
        invoiceStatusBadge = `<span style="background-color: #00ffc6; color: #08080c; padding: 6px 14px; border-radius: 6px; font-size: 11px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; display: inline-block;">Fully Paid / Verified</span>`;
      } else if (isPartPayment) {
        invoiceStatusBadge = `<span style="background-color: #f59e0b; color: #08080c; padding: 6px 14px; border-radius: 6px; font-size: 11px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; display: inline-block;">Advance Paid / Balance Pending</span>`;
      } else if (isPayOnDay) {
        invoiceStatusBadge = `<span style="background-color: #3b82f6; color: #ffffff; padding: 6px 14px; border-radius: 6px; font-size: 11px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; display: inline-block;">Cash Booking / Pay on Spot</span>`;
      } else if (isFree) {
        invoiceStatusBadge = `<span style="background-color: #10b981; color: #ffffff; padding: 6px 14px; border-radius: 6px; font-size: 11px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; display: inline-block;">Free Registration</span>`;
      } else {
        invoiceStatusBadge = `<span style="background-color: #6b7280; color: #ffffff; padding: 6px 14px; border-radius: 6px; font-size: 11px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; display: inline-block;">Confirmed / Applied</span>`;
      }

      const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Registration Tax Invoice - AlgorithmazeAI</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #07070a; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 650px; background-color: #0b0c10; margin: 30px auto; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,229,255,0.05);">
          <!-- Glowing Header -->
          <tr>
            <td style="padding: 30px 40px; background: linear-gradient(135deg, #0f172a 0%, #020617 100%); border-bottom: 2px solid #00e5ff;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px;">ALGORITHMAZE<span style="color: #00e5ff;">AI</span></h1>
                    <p style="margin: 4px 0 0 0; font-size: 10px; font-weight: 700; color: #94a3b8; letter-spacing: 2px; text-transform: uppercase;">Next-Gen AI & Tech Learning</p>
                  </td>
                  <td align="right">
                    <p style="margin: 0; font-size: 13px; font-weight: 800; color: #00e5ff; text-transform: uppercase; letter-spacing: 1px;">TAX INVOICE</p>
                    <p style="margin: 4px 0 0 0; font-size: 11px; font-weight: 600; color: #64748b; font-family: monospace;">${refNo}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Invoice Details Card -->
          <tr>
            <td style="padding: 24px 40px; background-color: #0f172a; border-bottom: 1px solid #1f2937;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="vertical-align: top;">
                    <p style="margin: 0 0 6px 0; font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">BILLED TO (STUDENT)</p>
                    <p style="margin: 0 0 2px 0; font-size: 15px; font-weight: 800; color: #ffffff;">${name}</p>
                    <p style="margin: 0 0 2px 0; font-size: 12px; color: #94a3b8; font-weight: 500;">${email}</p>
                    <p style="margin: 0; font-size: 12px; color: #94a3b8; font-family: monospace;">${extraData.phone || ''}</p>
                  </td>
                  <td width="50%" align="right" style="vertical-align: top;">
                    <p style="margin: 0 0 6px 0; font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">INVOICE DETAILS</p>
                    <p style="margin: 0 0 4px 0; font-size: 12px; color: #94a3b8; font-weight: 500;"><strong>Date:</strong> ${invoiceDate}</p>
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #94a3b8; font-weight: 500;"><strong>Payment Status:</strong> ${extraData.paymentStatus || 'Applied'}</p>
                    <div style="margin-top: 4px;">${invoiceStatusBadge}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Product Details Table -->
          <tr>
            <td style="padding: 40px 40px 20px 40px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <thead>
                  <tr style="border-bottom: 2px solid #1f2937;">
                    <th align="left" style="padding: 0 0 12px 0; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Item Description</th>
                    <th align="center" style="padding: 0 0 12px 0; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Qty</th>
                    <th align="right" style="padding: 0 0 12px 0; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid #1f2937;">
                    <td style="padding: 16px 0; vertical-align: top;">
                      <p style="margin: 0; font-size: 14px; font-weight: 800; color: #ffffff;">${course}</p>
                      <p style="margin: 4px 0 0 0; font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Type: ${extraData.type === 'internship' ? 'Internship track' : 'Specialized Program'}</p>
                      ${extraData.duration ? `<p style="margin: 2px 0 0 0; font-size: 11px; color: #64748b; font-weight: 500;">Duration: ${extraData.duration}</p>` : ''}
                    </td>
                    <td align="center" style="padding: 16px 0; font-size: 13px; font-weight: 700; color: #e2e8f0; vertical-align: top;">1</td>
                    <td align="right" style="padding: 16px 0; font-size: 14px; font-weight: 800; color: #ffffff; vertical-align: top;">₹${totalFee}/-</td>
                  </tr>

                  <!-- Calculations -->
                  <tr>
                    <td colspan="2" align="right" style="padding: 16px 0 8px 0; font-size: 12px; font-weight: 600; color: #64748b;">Subtotal</td>
                    <td align="right" style="padding: 16px 0 8px 0; font-size: 12px; font-weight: 700; color: #e2e8f0;">₹${totalFee}/-</td>
                  </tr>
                  <tr>
                    <td colspan="2" align="right" style="padding: 8px 0; font-size: 12px; font-weight: 700; color: #00ffc6; border-bottom: 1px solid #1f2937;">Registration Fee Paid (Advance)</td>
                    <td align="right" style="padding: 8px 0; font-size: 13px; font-weight: 900; color: #00ffc6; border-bottom: 1px solid #1f2937;">₹${amtPaid}/-</td>
                  </tr>
                  <tr>
                    <td colspan="2" align="right" style="padding: 16px 0 0 0; font-size: 14px; font-weight: 900; color: #ffffff;">Balance Amount Due</td>
                    <td align="right" style="padding: 16px 0 0 0; font-size: 16px; font-weight: 900; color: #ff5e62;">₹${amtDue}/-</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Next Steps Notification -->
          <tr>
            <td style="padding: 20px 40px 30px 40px;">
              <div style="background-color: #0f172a; border-left: 3px solid #00e5ff; padding: 20px; border-radius: 8px; border: 1px solid #1f2937; border-left-width: 4px;">
                <h4 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px;">📋 Instructions for Enrollment</h4>
                <p style="margin: 0; font-size: 12px; color: #94a3b8; font-weight: 500; line-height: 1.6;">
                  ${isPayOnDay 
                    ? `Please prepare a cash payment of <strong>₹${amtDue}</strong> to be submitted on the day of the class. Ensure to bring a physical copy or screenshot of this invoice.` 
                    : isPartPayment 
                    ? `Your advance seat registration of <strong>₹${amtPaid}</strong> is confirmed via transaction ID <strong>${extraData.paymentId || 'Verified'}</strong>. The remaining balance of <strong>₹${amtDue}</strong> must be paid upon program commencement.`
                    : isFree 
                    ? `Your registration is free. Our program administrator will schedule your onboarding.`
                    : `Your program fee of <strong>₹${amtPaid}</strong> is fully verified. Your account is fully active!`
                  }
                </p>
              </div>
            </td>
          </tr>

          <!-- Security and Seal -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="60%" style="vertical-align: bottom;">
                    <p style="margin: 0; font-size: 10px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">✓ Direct Banking Receipt Verified</p>
                    <p style="margin: 2px 0 0 0; font-size: 10px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">✓ Certified SSL Secure Transaction</p>
                  </td>
                  <td width="40%" align="right" style="vertical-align: bottom;">
                    <div style="text-align: right;">
                      <p style="margin: 0 0 5px 0; font-size: 11px; font-weight: 700; color: #64748b; font-style: italic;">AlgorithmazeAI Center</p>
                      <div style="border-top: 1px dashed #475569; padding-top: 5px; font-size: 9px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Authorized Signatory</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Corporate Footer -->
          <tr>
            <td style="padding: 24px; background-color: #020617; border-top: 1px solid #1f2937; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #475569; font-weight: 500;">© 2026 AlgorithmazeAI Platform. All rights reserved.</p>
              <p style="margin: 4px 0 0 0; font-size: 10px; color: #475569; font-weight: 500;">Trichy, Tamil Nadu, India • support@algorithmazeai.com • +91 999 444 8888</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
      `;

      mailOptions = {
        from: process.env.EMAIL_USER || 'your_email@gmail.com',
        to: email,
        bcc: adminEmail,
        subject: `Invoice & Enrollment Confirmed: ${course} - AlgorithmazeAI`,
        html: htmlBody
      };
    }
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// --- ROUTES ---

apiRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // 1. Super Admin Hardcoded Fallback (Emergency / Localhost)
  if (username === 'admin' && password === '#TonY@AMai@2026') {
    return res.json({ success: true, token: 'adminToken123', role: 'admin' });
  }

  if (useDB) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
      if (rows.length > 0) {
        return res.json({ success: true, token: 'adminToken123', role: rows[0].role });
      }
    } catch (err) {
      console.error('DB Login Error:', err);
      // Continue to JSON fallback if DB fails
    }
  }

  // 2. JSON File Fallback
  try {
    if (fs.existsSync(usersFile)) {
      const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        return res.json({ success: true, token: 'adminToken123', role: user.role });
      }
    }
  } catch(e) {
    console.error('JSON Login Error:', e);
  }

  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

apiRouter.get('/courses', async (req, res) => {
  if (useDB) {
    try {
      const [rows] = await pool.query('SELECT * FROM programs ORDER BY displayOrder ASC');
      const courses = rows.map(r => {
        const c = { 
          ...r, 
          features: typeof r.features === 'string' ? JSON.parse(r.features) : r.features,
          coupons: typeof r.coupons === 'string' ? JSON.parse(r.coupons) : r.coupons,
          isPreview: !!r.isPreview, 
          isOnline: !!r.isOnline 
        };
        if (c.price > 0 && !c.registerFeeFixed && !c.registerFeePercent) {
          c.registerFeePercent = 10;
        }
        return c;
      });
      res.json({ success: true, courses });
    } catch (err) {
      res.status(500).json({ success: false, message: 'DB Error' });
    }
  } else {
    try {
      const rawData = JSON.parse(fs.readFileSync(coursesFile, 'utf8'));
      // Handle both flat array and { courses: [] } structure
      const courses = (Array.isArray(rawData) ? rawData : (rawData.courses || [])).map(c => {
        if (c.price > 0 && !c.registerFeeFixed && !c.registerFeePercent) {
          c.registerFeePercent = 10;
        }
        return c;
      });
      res.json({ success: true, courses });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Could not read courses' });
    }
  }
});

// Alias for internships to prevent 404s if any old code calls it
apiRouter.get('/internships', (req, res) => {
  res.redirect('/api/courses');
});

apiRouter.post('/courses', async (req, res) => {
  const newCourse = req.body;
  const courseTitle = newCourse.title || newCourse.name || 'Untitled Course';
  let slug = newCourse.slug || courseTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  if (newCourse.price > 0 && !newCourse.registerFeeFixed && !newCourse.registerFeePercent) {
    newCourse.registerFeePercent = 10;
  }

  if (useDB) {
    try {
      // Simple duplicate check
      const [existing] = await pool.query('SELECT slug FROM programs WHERE slug = ?', [slug]);
      if (existing.length > 0) slug += '-' + Date.now();
      
      const featuresJson = JSON.stringify(newCourse.features || []);
      const couponsJson = JSON.stringify(newCourse.coupons || []);
      
      await pool.query(
        `INSERT INTO programs 
        (slug, title, name, description, features, durationValue, durationType, level, price, feeText, seats, discountText, discountCode, discountType, discountValue, type, category, displayOrder, mode, isOnline, imageUrl, syllabusUrl, isPreview, registerFeeFixed, registerFeePercent, coupons) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          slug, newCourse.title||'', newCourse.name||'', newCourse.desc||newCourse.description||'', featuresJson, 
          newCourse.durationValue||0, newCourse.durationType||'Days', newCourse.level||'', newCourse.price||0, newCourse.feeText||'', 
          newCourse.seats||'', newCourse.discount||'', newCourse.discountCode||'', newCourse.discountType||'percent', newCourse.discountValue||0, 
          newCourse.type||'course', newCourse.category||'', newCourse.displayOrder||99, newCourse.mode||'Offline', !!newCourse.isOnline, 
          newCourse.imageUrl||'', newCourse.syllabusUrl||'', !!newCourse.isPreview, newCourse.registerFeeFixed||0, newCourse.registerFeePercent||0,
          couponsJson
        ]
      );
      res.json({ success: true, message: 'Course created', course: { ...newCourse, slug } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'DB Error', error: err.message });
    }
  } else {
    try {
      const rawData = JSON.parse(fs.readFileSync(coursesFile, 'utf8'));
      const data = Array.isArray(rawData) ? rawData : (rawData.courses || []);
      if (data.some(c => c.slug === slug)) slug += '-' + Date.now();
      newCourse.slug = slug;
      data.push(newCourse);
      fs.writeFileSync(coursesFile, JSON.stringify(data, null, 2));
      res.json({ success: true, message: 'Course created', course: newCourse });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Could not create course' });
    }
  }
});

apiRouter.put('/courses/:slug', async (req, res) => {
  const { slug } = req.params;
  const updatedData = req.body;
  
  if (updatedData.price > 0 && !updatedData.registerFeeFixed && !updatedData.registerFeePercent) {
    updatedData.registerFeePercent = 10;
  }

  if (useDB) {
    try {
      const featuresJson = JSON.stringify(updatedData.features || []);
      const couponsJson = JSON.stringify(updatedData.coupons || []);
      await pool.query(
        `UPDATE programs SET 
        title=?, name=?, description=?, features=?, durationValue=?, durationType=?, level=?, price=?, feeText=?, seats=?, discountText=?, discountCode=?, discountType=?, discountValue=?, type=?, category=?, displayOrder=?, mode=?, isOnline=?, imageUrl=?, syllabusUrl=?, isPreview=?, registerFeeFixed=?, registerFeePercent=?, coupons=? 
        WHERE slug=?`,
        [
          updatedData.title||'', updatedData.name||'', updatedData.desc||updatedData.description||'', featuresJson, 
          updatedData.durationValue||0, updatedData.durationType||'Days', updatedData.level||'', updatedData.price||0, updatedData.feeText||'', 
          updatedData.seats||'', updatedData.discount||'', updatedData.discountCode||'', updatedData.discountType||'percent', updatedData.discountValue||0, 
          updatedData.type||'course', updatedData.category||'', updatedData.displayOrder||99, updatedData.mode||'Offline', !!updatedData.isOnline, 
          updatedData.imageUrl||'', updatedData.syllabusUrl||'', !!updatedData.isPreview, updatedData.registerFeeFixed||0, updatedData.registerFeePercent||0, couponsJson,
          slug
        ]
      );
      res.json({ success: true, message: 'Course updated', course: { ...updatedData, slug } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'DB Error', error: err.message });
    }
  } else {
    try {
      const rawData = JSON.parse(fs.readFileSync(coursesFile, 'utf8'));
      const data = Array.isArray(rawData) ? rawData : (rawData.courses || []);
      const index = data.findIndex(c => c.slug === slug);
      if (index !== -1) {
        data[index] = { ...data[index], ...updatedData, slug };
      } else {
        data.push({ ...updatedData, slug });
      }
      data.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
      fs.writeFileSync(coursesFile, JSON.stringify(data, null, 2));
      res.json({ success: true, message: 'Course updated', course: data[index] || updatedData });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Could not update course' });
    }
  }
});

apiRouter.delete('/courses/:slug', async (req, res) => {
  const { slug } = req.params;
  if (useDB) {
    try {
      await pool.query('DELETE FROM programs WHERE slug = ?', [slug]);
      res.json({ success: true, message: 'Course deleted' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'DB Error' });
    }
  } else {
    try {
      const rawData = JSON.parse(fs.readFileSync(coursesFile, 'utf8'));
      const data = Array.isArray(rawData) ? rawData : (rawData.courses || []);
      const filtered = data.filter(c => c.slug !== slug);
      fs.writeFileSync(coursesFile, JSON.stringify(filtered, null, 2));
      res.json({ success: true, message: 'Course deleted' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Could not delete course' });
    }
  }
});

apiRouter.get('/applications', async (req, res) => {
  if (useDB) {
    try {
      const [rows] = await pool.query('SELECT * FROM applications ORDER BY date DESC');
      res.json(rows);
    } catch (err) {
      res.status(500).json([]);
    }
  } else {
    try {
      const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      res.json(data);
    } catch (err) { res.json([]); }
  }
});

apiRouter.get('/applications/ref/:refNo', async (req, res) => {
  const { refNo } = req.params;
  if (useDB) {
    try {
      const [rows] = await pool.query('SELECT * FROM applications WHERE refNo = ?', [refNo]);
      if (rows.length > 0) res.json({ success: true, application: rows[0] });
      else res.status(404).json({ success: false, message: 'Application not found' });
    } catch (err) { res.status(500).json({ success: false }); }
  } else {
    try {
      const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      const app = data.find(a => a.refNo === refNo);
      if (app) res.json({ success: true, application: app });
      else res.status(404).json({ success: false });
    } catch(err) { res.status(500).json({ success: false }); }
  }
});

apiRouter.post('/applications', async (req, res) => {
  const newApp = { ...req.body, id: Date.now().toString(), date: new Date().toISOString() };
  
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  let countStr = "001";
  
  if (useDB) {
    try {
      const [rows] = await pool.query('SELECT COUNT(*) as count FROM applications');
      countStr = (rows[0].count + 1).toString().padStart(4, '0');
      
      const typeCode = newApp.type === 'internship' ? 'Int' : 'Co';
      const refNo = `AM-${typeCode}-${year}-${month}-${countStr}`;
      newApp.refNo = refNo;
      
      let dobDate = newApp.dob ? new Date(newApp.dob) : null;
      if (dobDate && isNaN(dobDate.getTime())) dobDate = null;

      let paymentMode = newApp.paymentId ? 'Online' : (newApp.paymentStatus === 'Pay on Day' ? 'Cash' : (newApp.paymentStatus === 'Free' ? 'None' : ''));

      await pool.query(
        `INSERT INTO applications 
        (id, refNo, type, name, email, phone, dob, studying, leadDetails, course, educationLevel, department, internshipDomain, duration, projectType, status, paymentId, paymentStatus, paymentMode, amountPaid, amountDue, date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newApp.id, refNo, newApp.type || 'course', newApp.name || '', newApp.email || '', newApp.phone || '', 
          dobDate, newApp.studying || '', newApp.leadDetails || '', newApp.course || '', 
          newApp.educationLevel || '', newApp.department || '', newApp.internshipDomain || '', newApp.duration || '', newApp.projectType || '', newApp.status || 'Applied', 
          newApp.paymentId || '', newApp.paymentStatus || '', paymentMode, newApp.amountPaid || 0, newApp.amountDue || 0, now
        ]
      );
      
      // Email Notification
      if (newApp.paymentStatus === 'Pay on Day') {
        sendConfirmationEmail(newApp.email, newApp.name, newApp.course, refNo, 'Pay on Day (Cash)', newApp.amountDue, false, '', newApp);
      } else if (newApp.paymentStatus === 'Free') {
        sendConfirmationEmail(newApp.email, newApp.name, newApp.course, refNo, 'Free Registration', '0', false, '', newApp);
      } else if (newApp.type === 'internship') {
        sendConfirmationEmail(newApp.email, newApp.name, 'Internship Program', refNo, 'Free / Direct', '0', false, '', newApp);
      } else {
        sendConfirmationEmail(newApp.email, newApp.name, newApp.course, refNo, newApp.paymentStatus, newApp.amountDue, false, '', newApp);
      }

      res.json({ success: true, message: 'Application submitted!', refNo });
    } catch (err) {
      console.error('Database application submission error:', err);
      res.status(400).json({ success: false, message: 'Database Error: ' + err.message });
    }
  } else {
    // Fallback logic
    try {
      const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      countStr = (data.length + 1).toString().padStart(4, '0');
      const typeCode = newApp.type === 'internship' ? 'Int' : 'Co';
      const refNo = `AM-${typeCode}-${year}-${month}-${countStr}`;
      newApp.refNo = refNo;
      
      data.push(newApp);
      fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
      
      sendConfirmationEmail(newApp.email, newApp.name, newApp.course || 'Program', refNo, newApp.paymentStatus, newApp.amountDue, false, '', newApp);
      res.json({ success: true, message: 'Application submitted!', refNo });
    } catch (err) {
      console.error('Fallback application submission error:', err);
      res.status(400).json({ success: false, message: 'Fallback Error: ' + err.message });
    }
  }
});

apiRouter.put('/applications/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (useDB) {
    try {
      // Enhanced update for all fields
      const fields = Object.keys(data).filter(k => k !== 'id' && k !== 'refNo' && k !== 'date');
      if (fields.length > 0) {
        const query = `UPDATE applications SET ${fields.map(f => `${f} = ?`).join(', ')} WHERE id = ?`;
        const values = [...fields.map(f => data[f]), id];
        await pool.query(query, values);
      }
      res.json({ success: true, message: 'Application updated' });
    } catch (err) {
      res.status(500).json({ success: false });
    }
  } else {
    try {
      let apps = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      const i = apps.findIndex(a => a.id === id);
      if (i !== -1) {
        apps[i] = { ...apps[i], ...data };
        fs.writeFileSync(dataFile, JSON.stringify(apps, null, 2));
        res.json({ success: true });
      } else res.status(404).json({ success: false });
    } catch(e) { res.status(500).json({ success: false }); }
  }
});

apiRouter.delete('/applications/:id', async (req, res) => {
  const { id } = req.params;
  if (useDB) {
    try {
      await pool.query('DELETE FROM applications WHERE id = ?', [id]);
      res.json({ success: true });
    } catch (err) { res.status(500).json({ success: false }); }
  } else {
    try {
      let apps = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      apps = apps.filter(a => a.id !== id);
      fs.writeFileSync(dataFile, JSON.stringify(apps, null, 2));
      res.json({ success: true });
    } catch(e) { res.status(500).json({ success: false }); }
  }
});

apiRouter.post('/contact', async (req, res) => {
  const msg = { ...req.body, id: Date.now().toString(), date: new Date().toISOString() };
  if (useDB) {
    try {
      await pool.query('INSERT INTO messages (id, name, email, phone, message, date) VALUES (?, ?, ?, ?, ?, ?)',
        [msg.id, msg.name, msg.email, msg.phone || '', msg.message, new Date(msg.date)]
      );
      // Admin notification
      sendConfirmationEmail(msg.email, msg.name, msg.phone, '', '', '', true, msg.message);
      res.json({ success: true, message: 'Message sent!' });
    } catch (err) { res.status(500).json({ success: false }); }
  } else {
    try {
      const data = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
      data.push(msg);
      fs.writeFileSync(messagesFile, JSON.stringify(data, null, 2));
      sendConfirmationEmail(msg.email, msg.name, msg.phone, '', '', '', true, msg.message);
      res.json({ success: true });
    } catch(e) { res.status(500).json({ success: false }); }
  }
});

apiRouter.get('/contact', async (req, res) => {
  if (useDB) {
    try {
      const [rows] = await pool.query('SELECT * FROM messages ORDER BY date DESC');
      res.json(rows);
    } catch (err) { res.status(500).json([]); }
  } else {
    try {
      res.json(JSON.parse(fs.readFileSync(messagesFile, 'utf8')));
    } catch(e) { res.json([]); }
  }
});

apiRouter.delete('/contact/:id', async (req, res) => {
  const { id } = req.params;
  if (useDB) {
    try {
      await pool.query('DELETE FROM messages WHERE id = ?', [id]);
      res.json({ success: true });
    } catch (err) { res.status(500).json({ success: false }); }
  } else {
    try {
      let data = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
      data = data.filter(m => m.id !== id);
      fs.writeFileSync(messagesFile, JSON.stringify(data, null, 2));
      res.json({ success: true });
    } catch(e) { res.status(500).json({ success: false }); }
  }
});

// Pricing / Payment Verification (Simplified for brevity)
apiRouter.get('/pricing/:slug', async (req, res) => {
  const { slug } = req.params;
  const { coupon } = req.query;
  
  try {
    let course;
    if (useDB) {
      const [rows] = await pool.query('SELECT * FROM programs WHERE slug = ?', [slug]);
      course = rows[0];
    } else {
      const coursesData = JSON.parse(fs.readFileSync(coursesFile, 'utf8'));
      course = coursesData.find(c => c.slug === slug);
    }

    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    
    if (course.price > 0 && !course.registerFeeFixed && !course.registerFeePercent) {
      course.registerFeePercent = 10;
    }

    let finalAmount = course.price || 0;
    let isApplied = false;

    if (finalAmount > 0 && coupon) {
      let appliedCoupon = null;
      
      // Check multi-coupons array first
      let couponsArray = course.coupons;
      if (typeof couponsArray === 'string') {
        try { couponsArray = JSON.parse(couponsArray); } catch(e) { couponsArray = []; }
      }
      
      if (Array.isArray(couponsArray)) {
        const todayStr = new Intl.DateTimeFormat('en-CA', {
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).format(new Date());
        appliedCoupon = couponsArray.find(c => {
          if (!c || !c.code || c.code.toUpperCase() !== coupon.toString().toUpperCase() || c.isActive === false) {
            return false;
          }
          if (c.startDate && todayStr < c.startDate) {
            return false;
          }
          if (c.endDate && todayStr > c.endDate) {
            return false;
          }
          return true;
        });
      } 
      
      // Fallback to legacy single coupon system
      if (!appliedCoupon && course.discountCode && coupon.toString().toUpperCase() === course.discountCode.toUpperCase()) {
        appliedCoupon = { type: course.discountType, value: course.discountValue };
      }

      if (appliedCoupon) {
        isApplied = true;
        const discountType = (appliedCoupon.type || '').toLowerCase();
        const discountValue = Number(appliedCoupon.value) || 0;
        if (discountType.includes('percent')) {
          finalAmount = finalAmount - (finalAmount * (discountValue / 100));
        } else {
          finalAmount = finalAmount - discountValue;
        }
      }
    }

    res.json({ success: true, basePrice: course.price || 0, finalAmount, isApplied });
  } catch (err) { res.status(500).json({ success: false, message: 'Error fetching price' }); }
});

// Razorpay: Create Order
apiRouter.post('/create-order', async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;
  
  try {
    const options = {
      amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Razorpay Order Error:', error);
    res.status(400).json({ success: false, message: 'Failed to create order: ' + (error.description || error.message || 'Unknown Razorpay error'), error });
  }
});

// Razorpay: Verify Payment
apiRouter.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET');
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === razorpay_signature) {
    res.json({ success: true, status: 'success' });
  } else {
    res.status(400).json({ success: false, status: 'failure', message: 'Invalid signature' });
  }
});

app.use('/', apiRouter);
app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found: ' + req.originalUrl });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
