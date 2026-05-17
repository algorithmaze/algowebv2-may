import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export function SectionHeading({ title, subtitle }: { title: any, subtitle: string }) {
  return (
    <div className="text-center mb-16 md:mb-20">
      <h2 className="text-3xl md:text-6xl font-black mb-6 uppercase tracking-tight text-white">{title}</h2>
      <p className="text-cyan-50/50 text-lg font-light max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}

export function CoursesSection() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'bootcamp' | 'course' | 'workshop'>('bootcamp');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/courses`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCourses(data.courses.sort((a: any, b: any) => (a.displayOrder || 99) - (b.displayOrder || 99)));
        }
      })
      .catch(console.error);
  }, []);

  const handleApply = (slug: string) => {
    const course = courses.find(c => c.slug === slug);
    navigate(`/register/course/${slug}?name=${encodeURIComponent(course?.title || '')}`);
  };

  const filteredCourses = courses.filter(c => (c.type || '').toLowerCase() === activeTab);

  const tabs = [
    { id: 'bootcamp', label: 'Bootcamps', icon: '🔥' },
    { id: 'course', label: 'Professional Courses', icon: '🎓' },
    { id: 'workshop', label: 'Workshops', icon: '🛠️' }
  ];

  return (
    <section id="courses" className="py-24 md:py-32 relative z-20">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 max-w-4xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 border-2 ${activeTab === tab.id 
                ? 'bg-electric-blue text-dark-black border-electric-blue shadow-[0_10px_30px_rgba(0,229,255,0.3)]' 
                : 'bg-white/5 text-white/50 border-white/10 hover:border-white/20 hover:bg-white/10'}`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="relative z-10">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 max-w-6xl mx-auto">
              {filteredCourses.map((course, i) => (
                <div key={i} className="glass-ui !p-0 group flex flex-col relative overflow-hidden rounded-[2rem] border border-white/10 hover:border-teal-green/30 transition-all duration-500 shadow-2xl">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none">
                    <img src="/images/course_bg.png" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-dark-black/80 to-transparent" />
                  </div>

                  <div className="relative z-10 p-8 md:p-10 flex-grow flex flex-col">
                    {/* Discount Badge */}
                    {course.discountCode && (
                      <div className="mb-6 inline-flex self-start">
                        <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-dark-black text-[10px] md:text-xs font-black uppercase tracking-wider px-5 py-2 rounded-xl shadow-[0_10px_20px_rgba(251,146,60,0.3)] transform -rotate-1 hover:rotate-0 transition-transform">
                          🎓 {course.discount || `${course.discountValue}${course.discountType === 'percent' ? '%' : '₹'} OFF (CODE: ${course.discountCode})`}
                        </div>
                      </div>
                    )}

                    {/* Level Badge */}
                    <div className="mb-8 flex items-center justify-between">
                      <span className="px-4 py-1.5 bg-electric-blue/20 border border-electric-blue/30 rounded-full text-[10px] font-black uppercase tracking-widest text-electric-blue">
                        {course.level || 'Intermediate'}
                      </span>
                      {course.seats && (
                         <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{course.seats} Available</span>
                      )}
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight group-hover:text-teal-green transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-cyan-50/60 text-base md:text-lg font-light mb-8 leading-relaxed">
                      {course.desc}
                    </p>

                    {/* Features List */}
                    {course.features && (
                      <ul className="space-y-4 mb-10">
                        {course.features.map((feat: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-4 text-white/80 group/item">
                             <div className="w-6 h-6 rounded-lg bg-teal-green/10 flex-shrink-0 flex items-center justify-center text-teal-green group-hover/item:bg-teal-green group-hover/item:text-dark-black transition-all">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                             </div>
                             <span className="text-sm md:text-base font-medium group-hover/item:text-white transition-colors">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Bottom Bar */}
                    <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                       <div className="flex flex-col">
                          <span className="text-xs text-white/30 uppercase tracking-[0.2em] font-bold mb-1">Duration</span>
                          <span className="text-white font-black text-sm uppercase">{course.duration}</span>
                       </div>

                       <button 
                         onClick={() => handleApply(course.slug)}
                         className="px-8 py-3.5 bg-gradient-to-r from-teal-green to-electric-blue text-dark-black font-black uppercase tracking-widest text-xs rounded-xl shadow-[0_15px_30px_rgba(0,255,198,0.2)] hover:shadow-[0_20px_40px_rgba(0,255,198,0.4)] transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2 group/btn cursor-pointer"
                       >
                         Register
                         <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                       </button>
                    </div>
                  </div>

                  {/* Flare decoration */}
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-teal-green/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-teal-green/20 transition-all duration-700" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
               <div className="text-6xl mb-6">⏳</div>
               <h3 className="text-2xl font-black text-white/40 uppercase tracking-widest">Coming Soon</h3>
               <p className="text-white/20 text-sm mt-2">New programs are currently in development.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  const projects = [
    {
      title: "Automated Voice Agent",
      desc: "Customer support for booking and lead generation for a Tourist Planner company.",
      image: "/images/project_voice_agent.png"
    },
    {
      title: "Admission Suggestor",
      desc: "AI-based platform to help students after class 10 & 12 find the best college and courses across all departments.",
      image: "/images/project_admission_suggestor.png"
    },
    {
      title: "Lead Generation Chatbot",
      desc: "Website chatbot for lead generation. Extracts user questions, redirects users to desired pages or products.",
      image: "/images/project_lead_gen.png"
    }
  ];

  return (
    <section id="projects" className="py-24 md:py-32 relative border-t border-white/5 bg-dark-black z-20 overflow-hidden">
      <div className="absolute inset-0 bg-electric-blue/5 blur-[150px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeading title={<>Innovation In <span className="text-teal-green">Action</span></>} subtitle="Real-world applications built by the AlgorithmazeAI community." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project, i) => (
            <div key={i} className="glass-ui !p-0 overflow-hidden group flex flex-col">
              <div className="h-48 bg-white/5 relative overflow-hidden flex-shrink-0">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 to-teal-green/20 mix-blend-overlay group-hover:opacity-50 transition-opacity duration-700" />
              </div>
              <div className="p-8 flex-grow">
                <h3 className="text-xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-cyan-50/70 font-light text-sm leading-relaxed">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InternshipSection() {
  const navigate = useNavigate();
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/courses`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const filtered = data.courses.filter((c: any) => (c.type || '').toLowerCase() === 'internship');
          setTracks(filtered.sort((a: any, b: any) => (a.displayOrder || 99) - (b.displayOrder || 99)));
        }
      })
      .catch(console.error);
  }, []);

  const handleTrackClick = (slug: string) => {
    navigate(`/internships/${slug}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {tracks.map((track, i) => (
        <div 
          key={i} 
          onClick={() => handleTrackClick(track.slug)}
          className="glass-ui !p-8 group cursor-pointer hover:border-teal-green/40 transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-green/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-teal-green/10 transition-all" />
          <div className="text-5xl mb-8 transform group-hover:scale-110 transition-transform origin-left">{track.icon || '🚀'}</div>
          <h3 className="text-2xl font-black text-white mb-4 group-hover:text-teal-green transition-colors">{track.title}</h3>
          <p className="text-cyan-50/50 text-sm leading-relaxed mb-10">{track.desc}</p>
          
          <div className="flex items-center justify-between pt-6 border-t border-white/5">
             <div className="flex flex-col">
                <span className="text-[10px] text-white/30 uppercase tracking-widest font-black mb-1">Duration</span>
                <span className="text-xs font-bold text-white/60">{track.duration || 'Flexible'}</span>
             </div>
             <span className="text-[10px] font-black uppercase tracking-widest text-teal-green group-hover:translate-x-2 transition-transform">Explore →</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TeamSection() {
  const team = [
    { name: "Antony AI", role: "AI Research & Development", icon: "🤖" },
    { name: "Tech Master", role: "Full Stack Automation", icon: "⚡" },
    { name: "Design Lead", role: "Creative Director", icon: "🎨" }
  ];

  return (
    <section id="team" className="py-24 md:py-32 bg-dark-black relative z-20 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        <SectionHeading title={<>The <span className="text-electric-blue">Masterminds</span></>} subtitle="Meet the visionaries building the future of technology." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div key={i} className="glass-ui !p-10 text-center group border border-white/5 hover:border-electric-blue/30 transition-all">
              <div className="text-6xl mb-8 group-hover:scale-110 transition-transform">{member.icon}</div>
              <h3 className="text-2xl font-black text-white mb-2">{member.name}</h3>
              <p className="text-cyan-50/50 uppercase tracking-widest text-xs font-bold">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const features = [
    { title: "AI-Powered Learning", desc: "Experience futuristic education integrated with advanced AI tools.", icon: "🤖" },
    { title: "Hands-on Projects", desc: "Build real-world industrial applications that matter.", icon: "🛠️" },
    { title: "Expert Mentorship", desc: "Learn directly from industry leaders and tech innovators.", icon: "👨‍🏫" },
    { title: "Career Acceleration", desc: "Get priority access to our hiring network and placement support.", icon: "🚀" }
  ];

  return (
    <section id="features" className="py-24 md:py-32 bg-white/5 border-y border-white/5 relative z-20 overflow-hidden">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-electric-blue/5 blur-[150px] rounded-full pointer-events-none" />
       <div className="container mx-auto px-6 lg:px-16 relative z-10">
         <SectionHeading title={<>Why Choose <span className="text-teal-green">AlgorithmazeAI?</span></>} subtitle="We don't just teach technology; we help you master the future." />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {features.map((feat, i) => (
             <div key={i} className="space-y-6 group">
               <div className="text-4xl group-hover:scale-110 transition-transform origin-left">{feat.icon}</div>
               <h3 className="text-xl font-bold text-white group-hover:text-teal-green transition-colors">{feat.title}</h3>
               <p className="text-cyan-50/50 text-sm leading-relaxed">{feat.desc}</p>
             </div>
           ))}
         </div>
       </div>
    </section>
  );
}

export function FAQSection() {
  const faqs = [
    { q: "Who can join these programs?", a: "Our programs are designed for students, freshers, and early-career professionals looking to upskill in AI, IoT, and Modern Tech." },
    { q: "Do I get a certificate?", a: "Yes, every program completion comes with an industry-recognized certificate from AlgorithmazeAI." },
    { q: "Is there any placement support?", a: "Absolutely! We provide career guidance, resume reviews, and direct referrals to our hiring partners." },
    { q: "Are the projects real-world?", a: "Yes, you will work on actual industrial projects and build a portfolio that stands out." }
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-dark-black relative z-20">
      <div className="container mx-auto px-6 lg:px-16">
        <SectionHeading title="FAQ<span>s</span>" subtitle="Common questions about our programs and approach." />
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-ui !p-8 border border-white/5 hover:border-white/10 transition-all">
              <h4 className="text-lg font-bold text-white mb-4">Q: {faq.q}</h4>
              <p className="text-cyan-50/60 leading-relaxed italic">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-white/5 border-t border-white/5 relative z-20">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to start your <br/><span className="text-electric-blue italic">Journey?</span></h2>
              <p className="text-cyan-50/60 text-lg mb-10 max-w-xl">Have specific questions or need career guidance? Our team is ready to help you navigate your path in technology.</p>
              
              <div className="space-y-6">
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue">📧</div>
                    <span className="text-white font-bold">contact@algorithmaze.ai</span>
                 </div>
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-teal-green/10 flex items-center justify-center text-teal-green">📍</div>
                    <span className="text-white font-bold">Trichy, Tamil Nadu</span>
                 </div>
              </div>
           </div>

           <div className="glass-ui !p-10 border border-white/10">
              <form className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-electric-blue outline-none transition-all text-white" />
                    <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-electric-blue outline-none transition-all text-white" />
                 </div>
                 <input type="text" placeholder="Subject" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-electric-blue outline-none transition-all text-white" />
                 <textarea placeholder="Your Message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-electric-blue outline-none transition-all text-white resize-none"></textarea>
                 <button className="w-full py-5 bg-gradient-to-r from-electric-blue to-teal-green text-dark-black font-black uppercase tracking-widest text-sm rounded-xl hover:shadow-[0_10px_30px_rgba(0,255,198,0.4)] transition-all transform hover:-translate-y-1">Send Message</button>
              </form>
           </div>
        </div>
      </div>
    </section>
  );
}
