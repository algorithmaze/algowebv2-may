import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { API_BASE_URL } from '../config';

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_BASE_URL}/api/courses`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const found = data.courses.find((c: any) => c.slug === slug);
          setCourse(found || null);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-black text-white flex flex-col items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-electric-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-dark-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-4 text-electric-blue">Course Not Found</h1>
        <p className="text-cyan-50/70 mb-8">The course you are looking for does not exist.</p>
        <Link to="/courses" className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold">
          View All Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="relative bg-dark-black text-white selection:bg-electric-blue selection:text-dark-black font-sans min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      
      {/* Premium Background Decoration */}
      <div className="absolute inset-0 z-0">
        <img src="/images/course_bg.png" alt="" className="w-full h-full object-cover opacity-[0.03] fixed" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-blue/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-green/5 blur-[150px] rounded-full pointer-events-none" />
      </div>

      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-6xl mx-auto">
            {/* Header section */}
            <div className="mb-16">
              <Link to="/courses" className="text-electric-blue hover:text-white transition-colors mb-8 inline-flex items-center gap-2 font-black uppercase tracking-widest text-xs group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to All Courses
              </Link>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                    {course.discountCode && (
                     <div className="mb-6 inline-flex bg-gradient-to-r from-orange-400 to-yellow-500 text-dark-black text-xs font-black uppercase tracking-widest px-6 py-2 rounded-xl shadow-[0_10px_20px_rgba(251,146,60,0.3)] items-center gap-1.5">
                       <span className="material-symbols-outlined text-sm">school</span> {course.discount || `${course.discountValue}${course.discountType === 'percent' ? '%' : '₹'} OFF`}
                     </div>
                   )}
                  
                  <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                    {course.title}
                  </h1>
                  
                  <div className="flex flex-wrap gap-4 mb-10">
                    <div className="px-5 py-2.5 bg-electric-blue/10 border border-electric-blue/20 rounded-2xl text-xs font-black uppercase tracking-widest text-electric-blue backdrop-blur-md">
                      {course.level || 'Professional'}
                    </div>
                    <div className="px-5 py-2.5 bg-teal-green/10 border border-teal-green/20 rounded-2xl text-xs font-black uppercase tracking-widest text-teal-green backdrop-blur-md">
                      {course.duration}
                    </div>
                  </div>
                  
                  <p className="text-xl md:text-2xl text-cyan-50/70 font-light leading-relaxed">
                    {course.desc}
                  </p>
                </div>

                <div className="hidden lg:block relative">
                   <div className="absolute inset-0 bg-electric-blue/20 blur-[100px] rounded-full animate-pulse" />
                   <div className="glass-ui !p-1 relative border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                      <img src="/images/course_bg.png" alt={course.title} className="w-full aspect-video object-cover rounded-[2.4rem] opacity-40" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-transparent to-transparent" />
                      <div className="absolute bottom-8 left-8 right-8">
                         <span className="material-symbols-outlined text-4xl mb-4 text-electric-blue block">rocket_launch</span>
                         <h4 className="text-white font-black text-xl mb-1">Practical Excellence</h4>
                         <p className="text-white/40 text-xs uppercase tracking-widest">Industry Standard Curriculum</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-16">
                {/* Features */}
                {course.features && course.features.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-black mb-8 flex items-center gap-4 text-white uppercase tracking-widest">
                      <span className="w-2 h-10 bg-electric-blue rounded-full" />
                      Learning Outcomes
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {course.features.map((feature: string, i: number) => (
                        <div key={i} className="glass-ui !p-8 border border-white/5 hover:border-electric-blue/30 transition-all flex items-start gap-6 group">
                          <div className="w-10 h-10 rounded-2xl bg-electric-blue/10 text-electric-blue flex items-center justify-center flex-shrink-0 group-hover:bg-electric-blue group-hover:text-dark-black transition-all">
                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <span className="text-cyan-50/80 font-bold leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div className="p-10 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[2rem] relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-electric-blue/5 blur-3xl rounded-full" />
                   <h3 className="text-2xl font-black mb-6 flex items-center gap-4">
                      <span className="material-symbols-outlined text-3xl text-electric-blue">account_balance</span>
                      Industry Integrated Curriculum
                   </h3>
                   <p className="text-cyan-50/60 leading-relaxed text-lg mb-8">
                     Our curriculum is designed to be 100% practical. You'll spend less time on theory and more time building real-world projects that you can showcase in your portfolio. From day one, you'll be working with industry-standard tools and technologies.
                   </p>
                   <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-teal-green" />
                         <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Live Projects</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-teal-green" />
                         <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Expert Mentorship</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-teal-green" />
                         <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Global Standards</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Sidebar / CTA */}
              <div className="lg:col-span-1">
                <div className="sticky top-32 glass-ui !p-10 border-t-4 border-t-electric-blue shadow-[0_40px_80px_rgba(0,0,0,0.5)] rounded-[2.5rem]">
                   <div className="mb-8">
                      <p className="text-xs text-white/30 font-black uppercase tracking-[0.2em] mb-4">Immediate Start</p>
                      <h4 className="text-3xl font-black text-white">Enroll Now</h4>
                   </div>

                  <button 
                    onClick={() => navigate(`/register/course/${course.slug}?name=${encodeURIComponent(course.title)}`)}
                    className="w-full py-6 bg-gradient-to-r from-electric-blue to-teal-green text-dark-black font-black text-xl rounded-2xl shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:shadow-[0_25px_50px_rgba(0,229,255,0.5)] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 group/btn"
                  >
                    Start Registration
                    <span className="transform group-hover/btn:translate-x-2 transition-transform">→</span>
                  </button>
                  
                  <div className="mt-10 pt-10 border-t border-white/5">
                    <p className="text-xs text-white/20 font-black uppercase tracking-[0.3em] mb-6 text-center">Batch Status</p>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                       <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Remaining Seats</span>
                       <span className="text-electric-blue font-black">{course.seats || 'Limited'}</span>
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
