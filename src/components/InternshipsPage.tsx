import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { InternshipSection } from './ContentSections';

export default function InternshipsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-dark-black text-white selection:bg-teal-green selection:text-dark-black font-sans min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Background glow specific to internships page */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-green/5 blur-[120px] rounded-full pointer-events-none z-0" />
        
        <div className="relative z-10 text-center py-16 px-6">
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-green to-electric-blue">
            Industrial Internship 2026
          </h1>
          <p className="text-xl md:text-2xl text-cyan-50/70 font-light max-w-3xl mx-auto leading-relaxed">
            Bridge the gap between academics and industry with our expert-led programs. 
            Designed for the next generation of tech leaders.
          </p>

          {/* Quick Stats/Hooks */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto mt-12">
            {[
              { icon: "track_changes", label: "Students / Freshers" },
              { icon: "work", label: "Practical Training" },
              { icon: "workspace_premium", label: "Recognized Certificate" },
              { icon: "rocket_launch", label: "Career Focused" },
              { icon: "verified", label: "Placement Support" }
            ].map((stat, i) => (
              <div key={i} className="glass-ui !p-4 border border-white/5 flex flex-col items-center gap-2 hover:border-teal-green/30 transition-all">
                <span className="material-symbols-outlined text-2xl text-teal-green">{stat.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Value Proposition */}
        <section className="py-24 bg-white/5 border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-teal-green/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* Left Column: Features */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                    More Than Just a <br/>
                    <span className="text-teal-green">Certificate.</span>
                  </h2>
                  <p className="text-cyan-50/60 text-lg leading-relaxed max-w-xl">
                    We deliver practical industrial training that transforms students into professionals, 
                    fully compliant with academic requirements.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { title: "Academic Compliance", desc: "Adheres to UGC & AICTE mandates to bridge the gap between theory and industry practice.", icon: "account_balance" },
                    { title: "Flexible Durations", desc: "15 Days to 6 Months programs tailored to your university requirements.", icon: "hourglass_empty" },
                    { title: "Project Mentorship", desc: "Expert guidance for both Mini (Pre-final) and Major (Final Year) projects.", icon: "folder_open" },
                    { title: "Career Placement", desc: "100% placement support with access to our elite hiring partner network.", icon: "verified" }
                  ].map((feat, i) => (
                    <div key={i} className="group">
                      <span className="material-symbols-outlined text-3xl text-teal-green mb-4 group-hover:scale-110 transition-transform origin-left block">{feat.icon}</span>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-green transition-colors">{feat.title}</h3>
                      <p className="text-cyan-50/50 text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Why Us Card */}
              <div className="glass-ui !p-10 md:!p-12 border border-white/10 relative overflow-hidden group shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-green/10 blur-3xl rounded-full -mr-16 -mt-16" />
                
                <div className="relative z-10">
                   <div className="px-4 py-1.5 bg-teal-green/20 border border-teal-green/30 rounded-full text-[10px] font-black uppercase tracking-widest text-teal-green inline-block mb-8">
                     Professional Excellence
                   </div>
                   <h2 className="text-3xl font-black mb-10">Why Students Choose Us?</h2>
                   
                   <ul className="space-y-8">
                      {[
                        { q: "NEP 2020 Aligned", a: "Strictly aligned with National Education Policy standards for credit transfers." },
                        { q: "Industrial Training", a: "Practical hands-on experience with live industrial tools and modern tech stacks." },
                        { q: "Verifiable Portfolios", a: "Build a strong, industry-ready GitHub profile validated by our experts." }
                      ].map((item, i) => (
                        <li key={i} className="flex gap-6">
                          <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center text-teal-green group-hover:bg-teal-green group-hover:text-dark-black transition-all">
                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <div>
                            <h4 className="font-bold text-white mb-1">{item.q}</h4>
                            <p className="text-sm text-cyan-50/60 leading-relaxed">{item.a}</p>
                          </div>
                        </li>
                      ))}
                   </ul>

                   <div className="mt-12 p-6 bg-dark-black/60 rounded-2xl border border-white/5">
                      <p className="text-xs text-teal-green font-black uppercase tracking-[0.2em] mb-3">Institutional Compliance</p>
                      <p className="text-sm text-cyan-50/50 italic leading-relaxed">
                        Our internship certifications strictly adhere to the mandates of UGC and AICTE, 
                        bridging the critical gap between academic theory and practical industry experience.
                      </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-4 uppercase tracking-tighter italic">Choose Your Domain</h2>
            <p className="text-center text-cyan-50/50 mb-16 max-w-xl mx-auto">Explore our diverse internship tracks and pick the one that matches your career goals.</p>
            <InternshipSection />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
