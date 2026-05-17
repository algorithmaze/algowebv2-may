import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { API_BASE_URL } from '../config';

export default function SuccessPage() {
  const { refNo } = useParams<{ refNo: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get('type') || 'course';
  
  const displayRefNo = refNo === 'undefined' ? `AMAI_RETRY_${Date.now()}` : refNo;
  const [appData, setAppData] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (refNo && refNo !== 'undefined') {
      fetch(`${API_BASE_URL}/api/applications/ref/${refNo}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) setAppData(data.application);
        })
        .catch(console.error);
    }
  }, [refNo]);

  return (
    <div className="relative bg-dark-black text-white selection:bg-electric-blue selection:text-dark-black font-sans min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 relative flex items-center justify-center">
        {/* Background ambient glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[150px] rounded-full pointer-events-none z-0 ${type === 'course' ? 'bg-electric-blue/10' : 'bg-teal-green/10'}`} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto glass-ui !p-8 md:!p-12 border border-white/10 shadow-[0_0_50px_rgba(0,229,255,0.05)] rounded-2xl relative overflow-hidden text-center animate-in zoom-in-95 duration-500">
            
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${type === 'course' ? 'bg-electric-blue/20 text-electric-blue' : 'bg-teal-green/20 text-teal-green'}`}>
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              {type === 'course' ? 'Registration Confirmed!' : 'Application Received!'}
            </h1>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10 inline-block w-full">
              <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-3">Your Unique Reference Number</p>
              <p className="text-4xl md:text-5xl font-mono font-black text-electric-blue tracking-tighter drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">{displayRefNo}</p>
              
              {appData && (appData.paymentId || appData.paymentStatus || appData.amountPaid || appData.amountDue) && (
                <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  {appData.paymentId && (
                    <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                      <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">Transaction ID</p>
                      <p className="font-mono text-white/90">{appData.paymentId}</p>
                    </div>
                  )}
                  {appData.paymentStatus && (
                    <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                      <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">Payment Status</p>
                      <p className={`font-bold ${appData.paymentStatus === 'Paid' ? 'text-electric-blue' : 'text-orange-400'}`}>{appData.paymentStatus}</p>
                    </div>
                  )}
                  {appData.amountPaid && (
                    <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                      <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">Amount Paid</p>
                      <p className="font-bold text-white/90">₹{appData.amountPaid}</p>
                    </div>
                  )}
                  {appData.amountDue && (
                    <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                      <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">Amount Due</p>
                      <p className="font-bold text-white/90">₹{appData.amountDue}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <p className="text-xl text-cyan-50/70 mb-10 leading-relaxed">
              {type === 'course' 
                ? 'Thank you for joining AlgorithmazeAI. We have received your registration and our team will contact you within 24 hours with further details.' 
                : 'Thank you for your interest in our internship program. Our team will review your application and get in touch with you shortly.'}
            </p>
            
            <div className="flex items-center justify-center gap-3 text-teal-green font-black text-sm mb-12 bg-teal-green/10 py-3 px-6 rounded-xl border border-teal-green/20 animate-pulse">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>PLEASE TAKE A SCREENSHOT FOR YOUR RECORDS</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/')} 
                className={`px-10 py-4 rounded-xl font-extrabold text-dark-black transition-all text-lg shadow-[0_0_20px_rgba(0,255,198,0.3)] hover:shadow-[0_0_30px_rgba(0,255,198,0.5)] transform hover:-translate-y-1 w-full sm:w-auto ${type === 'course' ? 'bg-electric-blue' : 'bg-teal-green'}`}
              >
                Return to Home Page
              </button>
              <button 
                onClick={() => navigate(type === 'course' ? '/courses' : '/internships')} 
                className="px-10 py-4 rounded-xl font-extrabold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-lg w-full sm:w-auto"
              >
                Explore More
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
