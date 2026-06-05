const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const DB_NAME = process.env.DB_NAME || 'algorithmaze';

async function migrate() {
  console.log('Starting migration from JSON to MySQL...');
  
  // Connect without database first to create it if it doesn't exist
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });
    
    console.log(`Creating database ${DB_NAME} if it doesn't exist...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    await connection.query(`USE \`${DB_NAME}\``);
    
    // Read schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute schema queries (split by ;)
    const queries = schemaSql.split(';').filter(q => q.trim().length > 0);
    console.log('Creating tables...');
    for (let q of queries) {
      await connection.query(q);
    }
    
    console.log('Tables created successfully.');
    
    // Import Data
    await importUsers(connection);
    await importPrograms(connection);
    await importApplications(connection);
    await importMessages(connection);
    
    console.log('🎉 Migration completed successfully!');
    
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    if (connection) await connection.end();
  }
}

async function importUsers(conn) {
  const file = path.join(__dirname, 'users.json');
  if (!fs.existsSync(file)) return;
  
  console.log('Importing users...');
  const users = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (let u of users) {
    try {
      await conn.query(
        'INSERT IGNORE INTO users (username, password, role) VALUES (?, ?, ?)',
        [u.username, u.password, u.role || 'user']
      );
    } catch (e) {
      console.error(`Failed to import user ${u.username}:`, e.message);
    }
  }
}

async function importPrograms(conn) {
  const file = path.join(__dirname, 'courses.json');
  if (!fs.existsSync(file)) return;
  
  console.log('Importing programs (courses/internships)...');
  const programs = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (let p of programs) {
    try {
      await conn.query(
        `INSERT IGNORE INTO programs 
        (slug, title, name, description, features, durationValue, durationType, level, price, feeText, seats, discountText, discountCode, discountType, discountValue, type, category, displayOrder, mode, isOnline, imageUrl, syllabusUrl, isPreview, registerFeeFixed, registerFeePercent) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.slug, p.title || '', p.name || '', p.desc || '', JSON.stringify(p.features || []), 
          p.durationValue || 0, p.durationType || 'Days', p.level || '', p.price || 0, p.feeText || '', 
          p.seats || '', p.discount || '', p.discountCode || '', p.discountType || '', p.discountValue || 0, 
          p.type || 'course', p.category || '', p.displayOrder || 99, p.mode || 'Offline', !!p.isOnline, 
          p.imageUrl || '', p.syllabusUrl || '', !!p.isPreview, p.registerFeeFixed || 0, p.registerFeePercent || 0
        ]
      );
    } catch (e) {
      console.error(`Failed to import program ${p.slug}:`, e.message);
    }
  }
}

async function importApplications(conn) {
  const file = path.join(__dirname, 'data.json');
  if (!fs.existsSync(file)) return;
  
  console.log('Importing applications...');
  const apps = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (let a of apps) {
    try {
      // Ensure valid date
      let appDate = new Date(a.date);
      if (isNaN(appDate.getTime())) appDate = new Date();
      let dobDate = a.dob ? new Date(a.dob) : null;
      if (dobDate && isNaN(dobDate.getTime())) dobDate = null;
      
      let paymentMode = a.paymentId ? 'Online' : (a.paymentStatus === 'Pay on Day' ? 'Cash' : (a.paymentStatus === 'Free' ? 'None' : ''));
      await conn.query(
        `INSERT IGNORE INTO applications 
        (id, refNo, type, name, email, phone, dob, studying, leadDetails, course, educationLevel, department, internshipDomain, duration, projectType, status, paymentId, paymentStatus, paymentMode, amountPaid, amountDue, date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          a.id || Date.now().toString(), a.refNo || `MIG_${Date.now()}`, a.type || 'course', a.name || 'Unknown', 
          a.email || '', a.phone || '', dobDate, a.studying || '', a.leadDetails || '', a.course || '', 
          a.educationLevel || '', a.department || '', a.internshipDomain || '', a.duration || '', a.projectType || '', a.status || 'Applied', 
          a.paymentId || '', a.paymentStatus || '', paymentMode, a.amountPaid || 0, a.amountDue || 0, appDate
        ]
      );
    } catch (e) {
      console.error(`Failed to import application ${a.refNo}:`, e.message);
    }
  }
}

async function importMessages(conn) {
  const file = path.join(__dirname, 'messages.json');
  if (!fs.existsSync(file)) return;
  
  console.log('Importing messages...');
  const msgs = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (let m of msgs) {
    try {
      let mDate = new Date(m.date);
      if (isNaN(mDate.getTime())) mDate = new Date();
      
      await conn.query(
        `INSERT IGNORE INTO messages (id, name, email, phone, message, date) VALUES (?, ?, ?, ?, ?, ?)`,
        [m.id || Date.now().toString(), m.name || 'Unknown', m.email || '', m.phone || '', m.message || '', mDate]
      );
    } catch (e) {
      console.error(`Failed to import message ${m.id}:`, e.message);
    }
  }
}

migrate();
