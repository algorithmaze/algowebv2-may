import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { API_BASE_URL } from '../config';
import PaymentComponent from './PaymentComponent';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RegistrationPage() {
  const { type, slug } = useParams<{ type: 'course' | 'internship', slug?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const courseNameParam = searchParams.get('name') || (slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown Program');
  
  // Ensure we have a valid type
  const actualType = type === 'course' || type === 'internship' ? type : 'course';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Course specific
  const [dob, setDob] = useState('');
  const [studying, setStudying] = useState('');
  const [leadDetails, setLeadDetails] = useState('');
  
  // Internship specific
  const [educationLevel, setEducationLevel] = useState('UG');
  const [department, setDepartment] = useState('');
  const [internshipDomain, setInternshipDomain] = useState('Fullstack with AI');
  const [duration, setDuration] = useState('');
  const [projectType, setProjectType] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'payment' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('Something went wrong. Please try again.');

  const [courseData, setCourseData] = useState<any>(null);
  const [allInternships, setAllInternships] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_BASE_URL}/api/courses`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (actualType === 'course' && slug) {
            const course = data.courses.find((c: any) => c.slug === slug);
            if (course) setCourseData(course);
          }
          const internships = data.courses.filter((c: any) => c.type === 'internship');
          if (internships.length > 0) {
            setAllInternships(internships);
            // Default select domain if matched or first in list
            if (actualType === 'internship') {
              const matched = slug ? internships.find((i: any) => i.slug === slug) : null;
              setInternshipDomain(matched ? matched.title : internships[0].title);
            }
          }
        }
      })
      .catch(console.error);
  }, [actualType, slug]);


  useEffect(() => {
    if (status === 'success') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [status]);

  const handleSubmit = async (e?: React.FormEvent, paymentResponse?: any) => {
    if (e) e.preventDefault();
    
    const isPaid = courseData && (courseData.price > 0 || (courseData.registerFeeFixed && courseData.registerFeeFixed > 0));

    // If it's a paid course and we don't have a payment response yet, move to payment step
    if (isPaid && !paymentResponse && status !== 'payment') {
      setStatus('payment');
      return;
    }

    setStatus('loading');
    setErrorMessage('Something went wrong. Please try again.');
    
    if (actualType === 'course') {
      const dobDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const m = today.getMonth() - dobDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      if (age < 10) {
        setStatus('error');
        setErrorMessage('Minimum age requirement is 10 years.');
        return;
      }
    }

    let pStatus = paymentResponse ? 'Paid' : 'Applied';
    if (courseData && courseData.price === 0) pStatus = 'Free';
    if (status === 'payment' && !paymentResponse) pStatus = 'Pay on Day';

    const payload = actualType === 'course' 
      ? { 
          type: actualType, name, email, phone, dob, studying, leadDetails, 
          course: courseData?.title || courseNameParam, status: 'Applied', 
          paymentStatus: pStatus,
          paymentId: paymentResponse?.razorpay_payment_id || '',
          amountPaid: paymentResponse ? (courseData.registerFeeFixed || courseData.price) : 0,
          amountDue: paymentResponse ? (courseData.price - (courseData.registerFeeFixed || courseData.price)) : (courseData?.price || 0)
        }
      : { 
          type: actualType, name, email, phone, educationLevel, department, internshipDomain, 
          duration, projectType, status: 'Applied',
          paymentStatus: pStatus
        };

    // Direct application submission
    try {
      const res = await fetch(`${API_BASE_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        const data = await res.json();
        setStatus('success');
        const finalRefNo = data.refNo || `AMAI_TEMP_${Date.now()}`;
        navigate(`/success/${finalRefNo}?type=${actualType}`);
      } else {
        setStatus('error');
        setErrorMessage('Failed to submit registration.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Could not connect to the server.');
    }
  };

  const handlePaymentSuccess = (response: any) => {
    handleSubmit(undefined, response);
  };

  const handlePaymentFailure = (error: any) => {
    console.error('Payment failed:', error);
  };

  return (
    <div className="relative bg-dark-black text-white selection:bg-electric-blue selection:text-dark-black font-sans min-h-screen flex flex-col">
      <Navbar />

      {/* Processing Overlay */}
      {status === 'loading' && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-in fade-in">
          <svg className="animate-spin h-12 w-12 text-electric-blue mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <h3 className="text-2xl font-bold text-white mb-2 text-center">
            Registering Your Spot
          </h3>
          <p className="text-white/60 text-center max-w-sm">
            Please wait while we finalize your registration. You will be redirected to the success page in a moment.
          </p>
        </div>
      )}
      
      <main className="flex-grow pt-32 pb-24 relative">
        {/* Background ambient glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[150px] rounded-full pointer-events-none z-0 ${actualType === 'course' ? 'bg-electric-blue/10' : 'bg-teal-green/10'}`} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto glass-ui !p-8 md:!p-12 border border-white/10 shadow-[0_0_50px_rgba(0,229,255,0.05)] rounded-2xl relative overflow-hidden">
            
            <div className="text-center mb-10">
              <h1 className={`text-3xl md:text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${actualType === 'course' ? 'from-white to-electric-blue' : 'from-white to-teal-green'}`}>
                {status === 'payment' ? 'Checkout' : (actualType === 'course' ? 'Join Program' : 'Apply for Internship')}
              </h1>
              {actualType === 'course' && <p className="text-lg font-bold text-white/80">{courseData?.title || courseNameParam}</p>}
              {actualType === 'internship' && <p className="text-lg font-bold text-white/80">Launch Your Career</p>}
            </div>

            {status === 'payment' ? (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Base Fee</span>
                    <span className="text-white font-black">₹{courseData?.price || 0}</span>
                  </div>
                  {courseData?.registerFeeFixed > 0 && (
                    <div className="flex justify-between items-center bg-electric-blue/5 -mx-6 px-6 py-4 border-y border-electric-blue/10">
                      <div>
                        <span className="block text-electric-blue text-[10px] font-black uppercase tracking-widest">Advance To Pay Now</span>
                        <span className="text-white/40 text-[9px] font-bold">Registration Fee</span>
                      </div>
                      <span className="text-electric-blue font-black text-xl">₹{courseData.registerFeeFixed}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Amount Due Later</span>
                    <span className="text-white font-bold opacity-60">₹{(courseData?.price || 0) - (courseData?.registerFeeFixed || 0)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <PaymentComponent 
                    amount={courseData?.registerFeeFixed || courseData?.price || 0}
                    email={email}
                    phone={phone}
                    courseName={courseData?.title || courseNameParam}
                    onSuccess={handlePaymentSuccess}
                    onFailure={handlePaymentFailure}
                  />
                  
                  <button 
                    onClick={() => handleSubmit()}
                    className="w-full py-4 text-white/40 hover:text-white font-black text-xs uppercase tracking-[0.2em] transition-all"
                  >
                    Pay Cash on Day (Submit Only)
                  </button>
                </div>

                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 flex items-center gap-2 text-white/30 hover:text-white transition-colors mx-auto text-[10px] font-black uppercase tracking-widest"
                >
                  ← Back to Details
                </button>
              </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Full Name</label>
                      <input required id="fullName" name="fullName" autoComplete="name" type="text" value={name} onChange={e => setName(e.target.value)} className={`w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-${actualType === 'course' ? 'electric-blue' : 'teal-green'} transition-colors`} />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Mobile Number</label>
                      <input required id="phone" name="phone" autoComplete="tel" type="tel" pattern="[0-9]{10}" maxLength={10} title="Please enter exactly 10 digits" value={phone} onChange={e => setPhone(e.target.value)} className={`w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-${actualType === 'course' ? 'electric-blue' : 'teal-green'} transition-colors`} />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Email Address</label>
                    <input required id="email" name="email" autoComplete="email" type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" title="Please enter a valid email address" value={email} onChange={e => setEmail(e.target.value)} className={`w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-${actualType === 'course' ? 'electric-blue' : 'teal-green'} transition-colors`} />
                  </div>

                  {actualType === 'course' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="dob" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Date of Birth</label>
                          <input required id="dob" name="dob" autoComplete="bday" type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-electric-blue transition-colors [color-scheme:dark]" />
                        </div>
                        <div>
                          <label htmlFor="studying" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Currently Studying</label>
                          <input required id="studying" name="studying" type="text" placeholder="Grade, School or College" value={studying} onChange={e => setStudying(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-electric-blue transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="leadDetails" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Future Expectations & Goals</label>
                        <textarea required id="leadDetails" name="leadDetails" rows={4} placeholder="Tell us what you hope to achieve..." value={leadDetails} onChange={e => setLeadDetails(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-electric-blue transition-colors resize-none" />
                      </div>
                    </>
                  )}

                  {actualType === 'internship' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="educationLevel" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Education Level</label>
                          <select required id="educationLevel" name="educationLevel" value={educationLevel} onChange={e => setEducationLevel(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-teal-green transition-colors appearance-none">
                            <option value="UG">Undergraduate (UG)</option>
                            <option value="PG">Postgraduate (PG)</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="department" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Department / Major</label>
                          <input required id="department" name="department" type="text" placeholder="e.g. Computer Science" value={department} onChange={e => setDepartment(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-teal-green transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="internshipDomain" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Internship Domain Needed</label>
                        <select required id="internshipDomain" name="internshipDomain" value={internshipDomain} onChange={e => setInternshipDomain(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-teal-green transition-colors appearance-none">
                          {allInternships.map((c, i) => (
                            <option key={i} value={c.title}>{c.title}</option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                          <label htmlFor="duration" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Duration Needed</label>
                          <select required id="duration" name="duration" value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-teal-green transition-colors appearance-none">
                            <option value="" disabled>Select Duration</option>
                            <option value="15 Days">15 Days</option>
                            <option value="1 Month">1 Month</option>
                            <option value="2 Months">2 Months</option>
                            <option value="3 Months">3 Months</option>
                            <option value="6 Months">6 Months</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="projectType" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Project Type</label>
                          <select required id="projectType" name="projectType" value={projectType} onChange={e => setProjectType(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-teal-green transition-colors appearance-none">
                            <option value="" disabled>Select Project</option>
                            <option value="Mini Project">Mini Project</option>
                            <option value="Major Project">Major Project</option>
                            <option value="Both">Both (Mini + Major)</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {status === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-center font-bold animate-pulse">
                      {errorMessage}
                    </div>
                  )}

                  
                    <button disabled={status === 'loading'} type="submit" className={`w-full mt-6 py-5 ${actualType === 'course' ? 'bg-gradient-to-r from-electric-blue to-teal-green shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] text-dark-black' : 'bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] text-dark-black'} font-extrabold text-lg rounded-xl transition-all flex justify-center items-center`}>
                      {status === 'loading' ? (
                        <svg className="animate-spin h-6 w-6 text-dark-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      ) : (actualType === 'course' && courseData?.price > 0 ? "Proceed to Payment" : "Confirm Registration")}
                    </button>
                </form>
              )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
