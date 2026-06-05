import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-dark-black text-white selection:bg-teal-green selection:text-dark-black font-sans min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-green/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-electric-blue/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="mb-16 text-center lg:text-left">
              <span className="px-4 py-1.5 bg-teal-green/10 border border-teal-green/20 rounded-full text-xs font-black uppercase tracking-widest text-teal-green inline-block mb-6">
                Startup Profile
              </span>
              <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tight uppercase">
                We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-green via-electric-blue to-white italic">Practical Tools</span>
              </h1>
              <p className="text-xl md:text-2xl text-cyan-50/70 font-light leading-relaxed max-w-2xl">
                Founded on the belief that complex tech should solve real-world problems, AlgorithmAze AI is a lean team of builders.
              </p>
            </div>

            {/* Story & Philosophy Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <div className="glass-ui relative overflow-hidden group hover:border-teal-green/30 border border-white/5 transition-all duration-500 rounded-3xl !p-10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-green/5 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-teal-green/10 transition-all pointer-events-none" />
                <span className="material-symbols-outlined text-4xl text-teal-green mb-6 block">rocket_launch</span>
                <h3 className="text-2xl font-bold text-white mb-4">Our Story</h3>
                <p className="text-cyan-50/60 leading-relaxed text-base font-light">
                  AlgorithmAze AI was established with a singular mission: to eliminate friction. We represent a fast-moving, high-impact startup that bridges the gap between hardware and software, connecting the digital intelligence of artificial intelligence with the physical presence of smart automation and IoT.
                </p>
              </div>

              <div className="glass-ui relative overflow-hidden group hover:border-electric-blue/30 border border-white/5 transition-all duration-500 rounded-3xl !p-10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-electric-blue/5 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-electric-blue/10 transition-all pointer-events-none" />
                <span className="material-symbols-outlined text-4xl text-electric-blue mb-6 block">psychology</span>
                <h3 className="text-2xl font-bold text-white mb-4">Our Philosophy</h3>
                <p className="text-cyan-50/60 leading-relaxed text-base font-light">
                  We don't do theory; we build practical tools. Whether it is engineering a custom enterprise automation system or guiding student developers inside our Tech Incubator, our focus remains on clean execution, proof of work, and shipping real code.
                </p>
              </div>
            </div>

            {/* Core Values Section */}
            <div className="py-12 border-t border-white/5">
              <h3 className="text-xs text-white/30 uppercase tracking-[0.3em] font-black mb-10 text-center">Engineered for Velocity</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                {[
                  { title: "No Fluff Copy", desc: "We speak with grounded transparency. No hyperbole or false-hope guarantees." },
                  { title: "Direct Cooperation", desc: "We connect digital AI and physical IoT/automation side-by-side in real-time." },
                  { title: "Talent Acceleration", desc: "Aspiring developers build real products beside us, fast-tracking their technical careers." }
                ].map((val, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="text-lg font-bold text-white">{val.title}</h4>
                    <p className="text-cyan-50/50 text-sm leading-relaxed max-w-xs mx-auto">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
