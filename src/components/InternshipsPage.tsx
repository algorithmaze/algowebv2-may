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
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-green to-electric-blue uppercase">
            Tech Incubator
          </h1>
          <p className="text-xl md:text-2xl text-cyan-50/70 font-light max-w-3xl mx-auto leading-relaxed">
            A fast-paced, practical co-building ecosystem. Collaborate directly on active startup products, wire physical IoT prototypes, and learn by shipping live code.
          </p>

          {/* Quick Stats/Hooks */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto mt-12">
            {[
              { icon: "handyman", label: "Live Co-Building" },
              { icon: "verified", label: "Proof of Work" },
              { icon: "rocket_launch", label: "Startup Culture" },
              { icon: "school", label: "Credit Compliant" },
              { icon: "trending_up", label: "Direct Referrals" }
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
                    Practical Co-Building <br/>
                    <span className="text-teal-green">Ecosystem.</span>
                  </h2>
                  <p className="text-cyan-50/60 text-lg leading-relaxed max-w-xl">
                    We don't do theory; we build practical software and hardware tools. Collaborate directly beside core founders to write production integrations and wire edge controllers.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { title: "Academic Compliance", desc: "Fully compliant with UGC & AICTE guidelines. Earn valid internship experience letters and credit verification.", icon: "account_balance" },
                    { title: "Flexible Durations", desc: "Flexible co-building tracks from 1 to 6 months designed to fit your academic timeline.", icon: "hourglass_empty" },
                    { title: "Project Portfolios", desc: "Construct verifiable public portfolios and strong GitHub profiles validated by shipped code, not exams.", icon: "folder_open" },
                    { title: "Direct Pathways", desc: "Direct placement opportunities and referrals within our fast-growing startup and client network.", icon: "verified" }
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
                     Tech Incubator
                    </div>
                    <h2 className="text-3xl font-black mb-10">Why Choose Tech Incubator?</h2>
                   
                   <ul className="space-y-8">
                      {[
                        { q: "Credit Compliant", a: "Strictly aligned with National Education Policy standards for credit transfers and college internship approvals." },
                        { q: "Real Product Delivery", a: "No mockup sandboxes. Flash custom firmware to active IoT boards and deploy APIs to production." },
                        { q: "Founder Access", a: "Collaborate directly with startup builders who review your code and guide your engineering decisions." }
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
                      <p className="text-xs text-teal-green font-black uppercase tracking-[0.2em] mb-3">Academic Integration</p>
                      <p className="text-sm text-cyan-50/50 italic leading-relaxed">
                        All co-building tracks are fully compliant with UGC and AICTE internship guidelines. We verify credit transfers and issue formal industry experience letters.
                      </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-4 uppercase tracking-tighter italic">Active Incubator <span className="text-teal-green">Tracks</span></h2>
            <p className="text-center text-cyan-50/50 mb-16 max-w-xl mx-auto">Choose an active engineering track to apply your skills on real software products and physical hardware prototypes.</p>
            <InternshipSection />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
