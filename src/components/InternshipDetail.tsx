import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { API_BASE_URL } from '../config';
import { getGoogleIcon } from './ContentSections';

export default function InternshipDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [track, setTrack] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_BASE_URL}/api/courses`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const found = data.courses.find((c: any) => c.slug === slug);
          setTrack(found || null);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-black text-white flex flex-col items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-teal-green border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="min-h-screen bg-dark-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-4 text-teal-green">Track Not Found</h1>
        <p className="text-cyan-50/70 mb-8">The internship track you are looking for does not exist.</p>
        <Link to="/internships" className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold">
          View All Tracks
        </Link>
      </div>
    );
  }

  return (
    <div className="relative bg-dark-black text-white selection:bg-teal-green selection:text-dark-black font-sans min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-green/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-electric-blue/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-4xl mx-auto">
            {/* Header section */}
            <div className="mb-12">
              <Link to="/internships" className="text-teal-green hover:text-white transition-colors mb-6 inline-flex items-center gap-2 font-bold group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Incubator Tracks
              </Link>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl md:text-7xl text-teal-green">{getGoogleIcon(track.icon || '💼')}</span>
                </div>
                <div>
                  <div className="px-4 py-1.5 bg-teal-green/20 border border-teal-green/30 rounded-full text-xs font-black uppercase tracking-widest text-teal-green inline-block mb-4">
                    Incubator Track
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black leading-tight text-white">
                    {track.title}
                  </h1>
                </div>
              </div>
              
              <p className="text-xl md:text-2xl text-cyan-50/70 font-light leading-relaxed mb-10">
                {track.desc || "Dive deep into modern technology with our industry-led internship track. Work on real projects, learn from experts, and launch your career in the tech world."}
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                {/* Benefits */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white uppercase tracking-widest text-sm">
                    Incubator Highlights
                  </h3>
                  <div className="space-y-4">
                    {[
                      { title: "Product Co-Building", desc: "Work directly beside founders to write production-grade logic for our startup products and clients.", icon: "rocket_launch" },
                      { title: "Founder Collaboration", desc: "Get daily feedback, code reviews, and hardware validation from active developers.", icon: "school" },
                      { title: "Academic Compliance", desc: "Fully compliant with UGC & AICTE guidelines. Earn valid internship experience letters and credit verification.", icon: "account_balance" },
                      { title: "Startup Network Pathways", desc: "Direct pathways and referrals to fast-growth tech startups and client networks.", icon: "verified" }
                    ].map((item, i) => (
                      <div key={i} className="glass-ui !p-6 border border-white/5 hover:border-teal-green/30 transition-all group flex gap-5">
                        <span className="material-symbols-outlined text-3xl text-teal-green flex-shrink-0">{item.icon}</span>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-teal-green transition-colors">{item.title}</h4>
                          <p className="text-cyan-50/60 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Structure */}
                <div>
                   <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white uppercase tracking-widest text-sm">
                    Incubator Program Structure
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass-ui !p-6 border border-teal-green/10">
                       <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                         <span className="material-symbols-outlined text-teal-green">hourglass_empty</span> Collaboration Timeline
                       </h4>
                       <p className="text-cyan-50/60 text-xs leading-relaxed">
                         Choose based on your academic timeline: <br/>
                         <span className="text-white/80 font-bold">1 to 6 Months Flexible Duration Tracks</span>
                       </p>
                    </div>
                    <div className="glass-ui !p-6 border border-electric-blue/10">
                       <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                         <span className="material-symbols-outlined text-electric-blue">folder_open</span> Builder Deliverables
                       </h4>
                       <p className="text-cyan-50/60 text-xs leading-relaxed">
                         Develop: <br/>
                         <span className="text-white/80 font-bold">Verifiable Public Portfolios</span> (GitHub & Live Demos) <br/>
                         <span className="text-white/80 font-bold">Physical IoT Hardware Prototypes</span>
                       </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar / CTA */}
              <div className="lg:col-span-1">
                <div className="sticky top-32 glass-ui !p-8 border-t-2 border-t-teal-green shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  <h3 className="text-xl font-bold mb-6 text-center">Ready to Build?</h3>
                  
                  <button 
                    onClick={() => navigate(`/register/internship/${track.slug}?name=${encodeURIComponent(track.title)}`)}
                    className="w-full py-5 bg-gradient-to-r from-teal-green to-electric-blue text-dark-black font-black text-xl rounded-2xl shadow-[0_15px_30px_rgba(0,255,198,0.2)] hover:shadow-[0_20px_40px_rgba(0,255,198,0.4)] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 group/btn cursor-pointer"
                  >
                    Apply to Incubator
                    <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                  
                  <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-4">Limited Spots Available</p>
                    <div className="p-4 bg-teal-green/10 rounded-xl border border-teal-green/20">
                      <p className="text-teal-green text-sm font-bold">Incubator Batch 2026 applications are currently open.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
