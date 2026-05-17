import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLenis } from 'lenis/react';
import { API_BASE_URL } from '../config';
import PaymentComponent from './PaymentComponent';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'course' | 'internship';
  courseName?: string;
}

export default function ApplicationModal({ isOpen, onClose, type, courseName }: ApplicationModalProps) {
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
  const [courses, setCourses] = useState<any[]>([]);
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'payment' | 'success' | 'error'>('idle');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    
    // Fetch courses to check for Free status and populate internship dropdown
    fetch(`${API_BASE_URL}/api/courses`)
      .then(res => res.json())
      .then(data => { 
        if (data.success) {
          setCourses(data.courses); 
          const internships = data.courses.filter((c: any) => (c.type || '').toLowerCase() === 'internship');
          if (internships.length > 0 && !internshipDomain) {
            setInternshipDomain(internships[0].title);
          }
        }
      })
      .catch(console.error);

    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
    // Find current course if name is provided
    if (courseName && courses.length > 0) {
      const found = courses.find((c: any) => c.title === courseName || c.name === courseName);
      setSelectedCourse(found);
    }
  }, [isOpen, lenis, courses, courseName]);

  if (!isOpen) return null;

  const handleSubmit = async (e?: React.FormEvent, paymentResponse?: any) => {
    if (e) e.preventDefault();
    
    const course = selectedCourse || (type === 'internship' ? courses.find((c: any) => c.title === internshipDomain) : null);
    const isPaid = course && (course.price > 0 || (course.registerFeeFixed && course.registerFeeFixed > 0));

    // If it's a paid course and we don't have a payment response yet, move to payment step
    if (isPaid && !paymentResponse && status !== 'payment') {
      setStatus('payment');
      return;
    }

    setStatus('loading');
    
    let pStatus = paymentResponse ? 'Paid' : 'Applied';
    if (course && course.price === 0) pStatus = 'Free';
    if (status === 'payment' && !paymentResponse) pStatus = 'Pay on Day'; // User chose cash/on-day

    const payload = type === 'course' 
      ? { 
          type, name, email, phone, dob, studying, leadDetails, 
          course: courseName, status: 'Applied', 
          paymentStatus: pStatus,
          paymentId: paymentResponse?.razorpay_payment_id || '',
          amountPaid: paymentResponse ? (course.registerFeeFixed || course.price) : 0,
          amountDue: paymentResponse ? (course.price - (course.registerFeeFixed || course.price)) : (course?.price || 0)
        }
      : { 
          type, name, email, phone, educationLevel, department, internshipDomain, 
          duration, projectType, status: 'Applied',
          paymentStatus: pStatus
        };

    try {
      const res = await fetch(`${API_BASE_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setStatus('success');
        // Reset fields
        setName(''); setEmail(''); setPhone(''); setDob('');
        setStudying(''); setLeadDetails(''); setDepartment('');
        setTimeout(() => {
          setStatus('idle');
          onClose();
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handlePaymentSuccess = (response: any) => {
    handleSubmit(undefined, response);
  };

  const handlePaymentFailure = (error: any) => {
    console.error('Payment failed:', error);
    // Optionally stay on payment screen or show error
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-dark-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div data-lenis-prevent="true" className="relative glass-ui !p-8 md:!p-10 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-white/10 shadow-[0_0_50px_rgba(0,229,255,0.15)] rounded-2xl transform transition-all animate-in zoom-in-95 scrollbar-hide">
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {status === 'success' ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-teal-green/20 text-teal-green rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Application Received!</h2>
            <p className="text-cyan-50/70">We will contact you shortly.</p>
          </div>
        ) : status === 'payment' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4">
             <div className="mb-8 text-center">
                <h3 className="text-xl font-black text-white mb-2">Checkout Summary</h3>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Secure Enrollment Gateway</p>
             </div>

             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Program</span>
                  <span className="text-white font-black text-right max-w-[200px]">{courseName || internshipDomain}</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                  <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Base Fee</span>
                  <span className="text-white font-black">₹{selectedCourse?.price || 0}</span>
                </div>
                {selectedCourse?.registerFeeFixed > 0 && (
                  <div className="flex justify-between items-center bg-electric-blue/5 -mx-6 px-6 py-4 border-y border-electric-blue/10">
                    <div>
                      <span className="block text-electric-blue text-[10px] font-black uppercase tracking-widest">Advance To Pay Now</span>
                      <span className="text-white/40 text-[9px] font-bold">Registration Fee</span>
                    </div>
                    <span className="text-electric-blue font-black text-xl">₹{selectedCourse.registerFeeFixed}</span>
                  </div>
                )}
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                  <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Amount Due Later</span>
                  <span className="text-white font-bold opacity-60">₹{(selectedCourse?.price || 0) - (selectedCourse?.registerFeeFixed || 0)}</span>
                </div>
             </div>

             <div className="space-y-4">
               <PaymentComponent 
                 amount={selectedCourse?.registerFeeFixed || selectedCourse?.price || 0}
                 email={email}
                 phone={phone}
                 courseName={courseName || internshipDomain}
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
          <>
            <div className="mb-10 text-center">
              <div className="inline-block px-4 py-1.5 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-electric-blue mb-4">
                Registration Portal 2026
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                {type === 'course' ? 'Join Program' : 'Start Internship'}
              </h2>
              {type === 'course' && <p className="text-sm font-bold text-electric-blue/80 uppercase tracking-widest">{courseName}</p>}
              {type === 'internship' && <p className="text-sm font-bold text-teal-green/80 uppercase tracking-widest text-[10px]">Bridging Academia & Industry</p>}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fullName" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Full Name</label>
                  <input required id="fullName" name="fullName" autoComplete="name" type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-colors" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Mobile Number</label>
                  <input required id="phone" name="phone" autoComplete="tel" type="tel" pattern="[0-9]{10}" maxLength={10} title="Please enter exactly 10 digits" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-colors" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Email Address</label>
                <input required id="email" name="email" autoComplete="email" type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" title="Please enter a valid email address" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-colors" />
              </div>

              {type === 'course' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="dob" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Date of Birth</label>
                      <input required id="dob" name="dob" autoComplete="bday" type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-colors [color-scheme:dark]" />
                    </div>
                    <div>
                      <label htmlFor="studying" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Currently Studying</label>
                      <input required id="studying" name="studying" type="text" placeholder="Grade, School or College" value={studying} onChange={e => setStudying(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="leadDetails" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Future Expectations & Goals</label>
                    <textarea required id="leadDetails" name="leadDetails" rows={3} placeholder="Tell us what you hope to achieve..." value={leadDetails} onChange={e => setLeadDetails(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-colors resize-none" data-lenis-prevent="true" />
                  </div>
                </>
              )}

              {type === 'internship' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="educationLevel" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Education Level</label>
                      <select required id="educationLevel" name="educationLevel" value={educationLevel} onChange={e => setEducationLevel(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-green transition-colors appearance-none">
                        <option value="UG">Undergraduate (UG)</option>
                        <option value="PG">Postgraduate (PG)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="department" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Department / Major</label>
                      <input required id="department" name="department" type="text" placeholder="e.g. Computer Science" value={department} onChange={e => setDepartment(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-green transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="internshipDomain" className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Internship Domain Needed</label>
                    <select required id="internshipDomain" name="internshipDomain" value={internshipDomain} onChange={e => setInternshipDomain(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-green transition-colors appearance-none">
                      {courses.filter((c: any) => c.type === 'internship').map((c: any, i: number) => (
                        <option key={i} value={c.title}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    <div>
                      <label htmlFor="duration" className="block text-[10px] uppercase tracking-widest text-white/40 font-black mb-3">Duration Needed</label>
                      <div className="relative group">
                        <select required id="duration" name="duration" value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-teal-green transition-all appearance-none cursor-pointer group-hover:bg-white/10">
                          <option value="" disabled className="bg-[#111]">Select Duration</option>
                          <option value="15 Days" className="bg-[#111]">15 Days</option>
                          <option value="1 Month" className="bg-[#111]">1 Month</option>
                          <option value="2 Months" className="bg-[#111]">2 Months</option>
                          <option value="3 Months" className="bg-[#111]">3 Months</option>
                          <option value="6 Months" className="bg-[#111]">6 Months</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">▼</div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="projectType" className="block text-[10px] uppercase tracking-widest text-white/40 font-black mb-3">Project Type</label>
                      <div className="relative group">
                        <select required id="projectType" name="projectType" value={projectType} onChange={e => setProjectType(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-teal-green transition-all appearance-none cursor-pointer group-hover:bg-white/10">
                          <option value="" disabled className="bg-[#111]">Select Project</option>
                          <option value="Mini Project" className="bg-[#111]">Mini Project</option>
                          <option value="Major Project" className="bg-[#111]">Major Project</option>
                          <option value="Both" className="bg-[#111]">Both (Mini + Major)</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">▼</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-teal-green/5 border border-teal-green/10 rounded-2xl">
                    <p className="text-[10px] text-teal-green/60 italic leading-relaxed text-center">
                      Our internship certifications strictly adhere to the mandates of UGC and AICTE for academic credit transfers.
                    </p>
                  </div>
                </>
              )}
              
              {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}
              
              <button disabled={status === 'loading'} type="submit" className={`w-full mt-8 py-5 ${type === 'course' ? 'bg-gradient-to-r from-electric-blue to-teal-green shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:shadow-[0_25px_50px_rgba(0,229,255,0.4)] text-dark-black' : 'bg-white shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_25px_50px_rgba(255,255,255,0.2)] text-dark-black'} font-black text-lg rounded-[1.2rem] transition-all hover:-translate-y-1 active:scale-95 flex justify-center items-center gap-3`}>
                {status === 'loading' ? (
                  <div className="w-6 h-6 border-4 border-dark-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {type === 'course' && selectedCourse?.price > 0 ? 'Proceed to Payment' : 'Submit Application'}
                    <span className="text-xl">→</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
