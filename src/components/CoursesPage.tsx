import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { CoursesSection } from './ContentSections';

export default function CoursesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-dark-black text-white selection:bg-electric-blue selection:text-dark-black font-sans min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Background glow specific to courses page */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric-blue/5 blur-[120px] rounded-full pointer-events-none z-0" />
        
        <div className="relative z-10 text-center py-16 px-6">
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-electric-blue to-teal-green uppercase italic">
            Elite Tech Courses 2026
          </h1>
          <p className="text-xl md:text-2xl text-cyan-50/70 font-light max-w-3xl mx-auto leading-relaxed">
            Master the most in-demand skills with our industry-led training programs. 
            Accelerate your career with AlgorithmazeAI.
          </p>

          {/* Quick Stats/Hooks */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto mt-12">
            {[
              { icon: "bolt", label: "Skills-Focused" },
              { icon: "handyman", label: "Hands-on Lab" },
              { icon: "school", label: "Expert Mentors" },
              { icon: "rocket_launch", label: "Project Based" },
              { icon: "trending_up", label: "Career Growth" }
            ].map((stat, i) => (
              <div key={i} className="glass-ui !p-4 border border-white/5 flex flex-col items-center gap-2 hover:border-electric-blue/30 transition-all">
                <span className="material-symbols-outlined text-2xl text-electric-blue">{stat.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Value Proposition */}
        <section className="py-24 bg-white/5 border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-electric-blue/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* Left Column: Features */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                    Master Skills that <br/>
                    <span className="text-electric-blue italic">Matter.</span>
                  </h2>
                  <p className="text-cyan-50/60 text-lg leading-relaxed max-w-xl">
                    Our curriculum is designed by working professionals to ensure you learn exactly what 
                    the industry demands in 2026.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { title: "Industry Mentors", desc: "Learn directly from engineers working at top global tech firms.", icon: "engineering" },
                    { title: "Live Projects", desc: "Build real-world applications that you can showcase in your portfolio.", icon: "rocket_launch" },
                    { title: "AI-Integrated", desc: "Curriculum updated with latest AI tools to boost your productivity.", icon: "smart_toy" },
                    { title: "Career Support", desc: "Resume building, mock interviews, and referral support for top students.", icon: "handshake" }
                  ].map((feat, i) => (
                    <div key={i} className="group">
                      <span className="material-symbols-outlined text-3xl text-electric-blue mb-4 group-hover:scale-110 transition-transform origin-left block">{feat.icon}</span>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-electric-blue transition-colors">{feat.title}</h3>
                      <p className="text-cyan-50/50 text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Why Us Card */}
              <div className="glass-ui !p-10 md:!p-12 border border-white/10 relative overflow-hidden group shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-electric-blue/10 blur-3xl rounded-full -mr-16 -mt-16" />
                
                <div className="relative z-10">
                   <div className="px-4 py-1.5 bg-electric-blue/20 border border-electric-blue/30 rounded-full text-[10px] font-black uppercase tracking-widest text-electric-blue inline-block mb-8">
                     Excellence in Training
                   </div>
                   <h2 className="text-3xl font-black mb-10">Why AlgorithmazeAI?</h2>
                   
                   <ul className="space-y-8">
                      {[
                        { q: "Cutting-Edge Tech", a: "We teach the latest stacks including ESP32, AI agents, and full-stack automation." },
                        { q: "Practical Labs", a: "Hands-on implementation for every concept with real hardware and cloud tools." },
                        { q: "Lifetime Access", a: "Join our private community and get lifetime access to recorded sessions and updates." }
                      ].map((item, i) => (
                        <li key={i} className="flex gap-6">
                          <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center text-electric-blue group-hover:bg-electric-blue group-hover:text-dark-black transition-all">
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
                      <p className="text-xs text-electric-blue font-black uppercase tracking-[0.2em] mb-3">Skill Certification</p>
                      <p className="text-sm text-cyan-50/50 italic leading-relaxed">
                        Every course includes a verified certificate of completion and a showcase-ready project to boost your career prospects.
                      </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="programs" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-4 uppercase tracking-tighter italic">Explore Our <span className="text-electric-blue">Programs</span></h2>
            <p className="text-center text-cyan-50/50 mb-16 max-w-xl mx-auto">Choose between specialized bootcamps, professional courses, and intensive workshops.</p>
            <CoursesSection />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
