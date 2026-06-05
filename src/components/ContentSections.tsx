import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { useLenis } from 'lenis/react';

export function getGoogleIcon(emojiOrSymbol: string) {
  const mapping: { [key: string]: string } = {
    "🧠": "psychology",
    "⚡": "bolt",
    "📟": "developer_board",
    "🛠️": "handyman",
    "💻": "terminal",
    "🌐": "public",
    "🚀": "rocket_launch",
    "🤖": "smart_toy",
    "👨‍🏫": "school",
    "⏳": "hourglass_empty",
    "🎓": "school"
  };
  return mapping[emojiOrSymbol] || emojiOrSymbol || "arrow_forward";
}

export function SectionHeading({ title, subtitle }: { title: any, subtitle: string }) {
  return (
    <div className="text-center mb-16 md:mb-20">
      <h2 className="text-3xl md:text-6xl font-black mb-6 uppercase tracking-tight text-white">{title}</h2>
      <p className="text-cyan-50/50 text-lg font-light max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}

export function WingsSection() {
  const navigate = useNavigate();
  const lenis = useLenis();

  return (
    <section id="wings" className="py-24 md:py-32 bg-dark-black relative z-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-blue/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeading 
          title={<>Core <span className="text-electric-blue">Operations</span></>} 
          subtitle="We build cutting-edge digital products and accelerate the next generation of tech builders." 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Card A: Algorithmaze AI - Solutions */}
          <div className="glass-ui relative overflow-hidden group hover:border-electric-blue/40 border border-white/10 transition-all duration-500 rounded-[2.5rem] !p-8 md:!p-12 flex flex-col justify-between min-h-[500px]">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700 pointer-events-none z-0"
              style={{ 
                backgroundImage: 'url(/images/solutions_wing_bg.png)'
              }}
            />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-electric-blue/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-electric-blue/20 transition-all duration-700 z-0" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <span className="px-5 py-2 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-xs font-black uppercase tracking-widest text-electric-blue flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">bolt</span> Enterprise & Solutions
                </span>
                <span className="material-symbols-outlined text-4xl text-electric-blue">psychology</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight group-hover:text-electric-blue transition-colors">
                Algorithmaze AI
              </h3>
              <p className="text-xs uppercase font-black tracking-widest text-electric-blue/80 mb-6">
                Custom Solutions Wing
              </p>
              <p className="text-cyan-50/70 text-base md:text-lg font-light mb-8 leading-relaxed">
                A high-velocity technology company building innovative custom enterprise software, physical IoT systems, edge sensors, and smart automation systems for startups and mid-market scales.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Smart Automation & IoT Systems",
                  "AI Development & Core Solutions",
                  "Business & Marketing Automation",
                  "B2B Enterprise Workflows",
                  "B2C Consumer Applications",
                  "Full Stack MVP Development"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-white/80">
                    <div className="w-5 h-5 rounded-md bg-electric-blue/10 flex-shrink-0 flex items-center justify-center text-electric-blue">
                      <span className="material-symbols-outlined text-[12px] font-black">done</span>
                    </div>
                    <span className="text-sm md:text-base font-semibold">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-electric-blue/70 mb-10 italic border-l border-electric-blue/30 pl-4 py-1 leading-relaxed">
                We develop custom AI models, intelligent pipelines, and hardware automation built to eliminate operational friction and scale modern operations.
              </p>
            </div>
            
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                if (lenis) {
                  lenis.scrollTo('#projects');
                } else {
                  const elem = document.getElementById('projects');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full text-center py-4 bg-white/5 border border-white/10 hover:border-electric-blue hover:bg-electric-blue hover:text-dark-black text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all duration-300 relative z-10"
            >
              Explore Solutions
            </a>
          </div>

          {/* Card B: Incubator & Accelerator */}
          <div className="glass-ui relative overflow-hidden group hover:border-teal-green/40 border border-white/10 transition-all duration-500 rounded-[2.5rem] !p-8 md:!p-12 flex flex-col justify-between min-h-[500px]">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700 pointer-events-none z-0"
              style={{ 
                backgroundImage: 'url(/images/incubator_wing_bg.png)'
              }}
            />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-green/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-teal-green/20 transition-all duration-700 z-0" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <span className="px-5 py-2 bg-teal-green/10 border border-teal-green/20 rounded-full text-xs font-black uppercase tracking-widest text-teal-green flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">rocket_launch</span> Talent Accelerator
                </span>
                <span className="material-symbols-outlined text-4xl text-teal-green">developer_board</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight group-hover:text-teal-green transition-colors">
                Internship & Training
              </h3>
              <p className="text-xs uppercase font-black tracking-widest text-teal-green/80 mb-6">
                Internship & Training Ecosystem
              </p>
              <p className="text-cyan-50/70 text-base md:text-lg font-light mb-8 leading-relaxed">
                A fast-paced, practical ecosystem where students and aspiring developers collaborate directly on real products, assemble physical IoT prototypes, and learn by shipping live code.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Internship Collaboration Track",
                  "Hands-on IoT Prototyping",
                  "Proof of Work Public Portfolios",
                  "Live Software Shipping",
                  "UGC/AICTE Academic Compliance",
                  "Startup Culture Integration"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-white/80">
                    <div className="w-5 h-5 rounded-md bg-teal-green/10 flex-shrink-0 flex items-center justify-center text-teal-green">
                      <span className="material-symbols-outlined text-[12px] font-black">done</span>
                    </div>
                    <span className="text-sm md:text-base font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-xs text-teal-green/70 mb-10 italic border-l border-teal-green/30 pl-4 py-1 leading-relaxed">
                Build the exact systems we engineer. Work directly beside core founders to write production-ready integrations and wire edge controllers.
              </p>
            </div>
            
            <button 
              onClick={() => navigate("/internships")}
              className="w-full text-center py-4 bg-white/5 border border-white/10 hover:border-teal-green hover:bg-teal-green hover:text-dark-black text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all duration-300 cursor-pointer relative z-10"
            >
              Apply to Internship & Training
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VisionMissionSection() {
  return (
    <section id="vision-mission" className="py-24 md:py-32 bg-dark-black relative z-20 border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-teal-green/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeading 
          title={<>Vision & <span className="text-teal-green">Mission</span></>} 
          subtitle="Our core purpose and aspirations driving AlgorithmAze AI and our Tech Incubator forward." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Vision Card */}
          <div className="glass-ui relative overflow-hidden group hover:border-electric-blue/40 border border-white/10 transition-all duration-500 rounded-[2rem] !p-10 flex flex-col items-start">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700 pointer-events-none z-0"
              style={{ 
                backgroundImage: 'url(/images/vision_bg.png)'
              }}
            />
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-electric-blue/10 blur-3xl rounded-full pointer-events-none group-hover:bg-electric-blue/20 transition-all duration-700 z-0" />
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-electric-blue/40 group-hover:scale-110 transition-all relative z-10">
              <span className="material-symbols-outlined text-3xl text-electric-blue">visibility</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-wider group-hover:text-electric-blue transition-colors relative z-10">
              Our Vision
            </h3>
            <p className="text-cyan-50/70 text-lg font-light leading-relaxed relative z-10">
              To eliminate operational friction globally by connecting the digital intelligence of AI with the physical world of IoT and Automation.
            </p>
          </div>

          {/* Mission Card */}
          <div className="glass-ui relative overflow-hidden group hover:border-teal-green/40 border border-white/10 transition-all duration-500 rounded-[2rem] !p-10 flex flex-col items-start">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700 pointer-events-none z-0"
              style={{ 
                backgroundImage: 'url(/images/mission_bg.png)'
              }}
            />
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-green/10 blur-3xl rounded-full pointer-events-none group-hover:bg-teal-green/20 transition-all duration-700 z-0" />
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-teal-green/40 group-hover:scale-110 transition-all relative z-10">
              <span className="material-symbols-outlined text-3xl text-teal-green">track_changes</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-wider group-hover:text-teal-green transition-colors relative z-10">
              Our Mission
            </h3>
            <p className="text-cyan-50/70 text-lg font-light leading-relaxed relative z-10">
              To engineer practical software and hardware tools that solve B2B/B2C bottlenecks, while accelerating aspiring talent in an immersive incubator that values proof of work.
            </p>
          </div>
        </div>
      </div>
    </section>
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
    { id: 'bootcamp', label: 'Bootcamps', icon: 'local_fire_department' },
    { id: 'course', label: 'Professional Courses', icon: 'school' },
    { id: 'workshop', label: 'Workshops', icon: 'handyman' }
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
              <span className="material-symbols-outlined text-xl">{tab.icon}</span>
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
                        <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-dark-black text-[10px] md:text-xs font-black uppercase tracking-wider px-5 py-2 rounded-xl shadow-[0_10px_20px_rgba(251,146,60,0.3)] transform -rotate-1 hover:rotate-0 transition-transform flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-xs">school</span> {course.discount || `${course.discountValue}${course.discountType === 'percent' ? '%' : '₹'} OFF (CODE: ${course.discountCode})`}
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
                         data-cursor="Register"
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
            <div className="text-center py-20 flex flex-col items-center justify-center">
               <span className="material-symbols-outlined text-6xl mb-6 text-white/40 block">hourglass_empty</span>
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
            <div key={i} data-cursor="Project" className="glass-ui !p-0 overflow-hidden group flex flex-col cursor-pointer">
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
          data-cursor="Incubator"
          className="glass-ui !p-8 group cursor-pointer hover:border-teal-green/40 transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-green/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-teal-green/10 transition-all" />
          <span className="material-symbols-outlined text-5xl mb-8 transform group-hover:scale-110 transition-transform origin-left block text-teal-green">{getGoogleIcon(track.icon || '🚀')}</span>
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
    { name: "Antony Robinson Sundarraj", role: "Founder & CEO", icon: "account_circle" },
    { name: "Prajesh R", role: "Mentor", icon: "school" },
    { name: "Mekloria & Prajesh R", role: "Investor", icon: "payments" },
    { name: "Joevit Sundarraj", role: "Digital Marketing & Social Media", icon: "campaign" }
  ];

  return (
    <section id="team" className="py-24 md:py-32 bg-dark-black relative z-20 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        <SectionHeading title={<>The <span className="text-electric-blue">Masterminds</span></>} subtitle="Meet the visionaries building the future of technology." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member, i) => (
            <div key={i} className="glass-ui !p-10 text-center group border border-white/5 hover:border-electric-blue/30 transition-all flex flex-col items-center justify-between rounded-3xl min-h-[320px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-electric-blue/5 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-electric-blue/10 transition-all pointer-events-none" />
              
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-electric-blue/40 group-hover:scale-110 transition-all flex-shrink-0">
                <span className="material-symbols-outlined text-electric-blue group-hover:text-white transition-colors" style={{ fontSize: '2.5rem' }}>{member.icon}</span>
              </div>
              
              <div className="flex-grow flex flex-col justify-end">
                <h3 className="text-lg font-black text-white mb-3 tracking-tight leading-snug">{member.name}</h3>
                <p className="text-cyan-50/50 uppercase tracking-widest text-[10px] font-black">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  const services = [
    { title: "Smart Automation & IoT", desc: "Designing physical IoT ecosystems, edge devices, smart sensors, and hardware-to-cloud systems that automate manual tasks.", icon: "developer_board" },
    { title: "AI Development & Core Solutions", desc: "Custom AI agent development, machine learning pipeline integration, and smart algorithm design tailored to startup and mid-market scales.", icon: "psychology" },
    { title: "Business & Marketing Automation", desc: "Automating lead generation funnels, CRM triggers, programmatic ad workflows, and marketing operations to save businesses hours of manual effort.", icon: "trending_up" },
    { title: "B2B Enterprise Automation", desc: "End-to-end operational automation, automated invoicing, supply chain tracking, and data sync tools for business-to-business workflows.", icon: "business" },
    { title: "B2C Consumer Automation", desc: "Building intuitive, automated mobile and web applications that simplify daily workflows and provide instant value directly to everyday end-users.", icon: "devices" },
    { title: "Full Stack Development", desc: "Rapid prototyping, MVP (Minimum Viable Product) creation, and scalable web/mobile applications engineered to launch and adapt quickly.", icon: "terminal" }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-white/5 border-y border-white/5 relative z-20 overflow-hidden">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-electric-blue/5 blur-[150px] rounded-full pointer-events-none" />
       <div className="container mx-auto px-6 lg:px-16 relative z-10">
         <SectionHeading title={<>Core Startup <span className="text-electric-blue">Services</span></>} subtitle="Building the innovative software and hardware systems that drive business growth and eliminate operational friction." />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
           {services.map((svc, i) => {
             const isSmartAutomation = svc.title === 'Smart Automation & IoT';
             const isAIDev = svc.title === 'AI Development & Core Solutions';
             const isMarketingAuto = svc.title === 'Business & Marketing Automation';
             const isB2B = svc.title === 'B2B Enterprise Automation';
             const isB2C = svc.title === 'B2C Consumer Automation';
              const isFullStack = svc.title === 'Full Stack Development';
             return (
               <div key={i} className="glass-ui !p-8 group hover:border-electric-blue/30 transition-all border border-white/5 relative overflow-hidden rounded-3xl flex flex-col justify-between">
                 {isSmartAutomation && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 pointer-events-none z-0"
                      style={{ 
                        backgroundImage: 'url(/images/smart_iot_bg.png)'
                      }}
                    />
                  )}
                 {isAIDev && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 pointer-events-none z-0"
                      style={{ 
                        backgroundImage: 'url(/images/ai_dev_bg.png)'
                      }}
                    />
                  )}
                 {isMarketingAuto && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 pointer-events-none z-0"
                      style={{ 
                        backgroundImage: 'url(/images/marketing_bg.png)'
                      }}
                    />
                  )}
                 {isB2B && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 pointer-events-none z-0"
                      style={{ 
                        backgroundImage: 'url(/images/b2b_bg.png)'
                      }}
                    />
                  )}
                 {isB2C && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 pointer-events-none z-0"
                      style={{ 
                        backgroundImage: 'url(/images/b2c_bg.png)'
                      }}
                    />
                  )}
                  {isFullStack && (
                     <div 
                       className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 pointer-events-none z-0"
                       style={{ 
                         backgroundImage: 'url(/images/fullstack_bg.png)'
                       }}
                     />
                   )}
                 <div className="absolute top-0 right-0 w-24 h-24 bg-electric-blue/5 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-electric-blue/10 transition-all pointer-events-none z-0" />
                 <div className="relative z-10">
                   <span className="material-symbols-outlined text-4xl mb-6 text-electric-blue group-hover:scale-110 transition-transform origin-left block">{svc.icon}</span>
                   <h3 className="text-xl font-bold text-white mb-4 group-hover:text-electric-blue transition-colors">{svc.title}</h3>
                   <p className="text-cyan-50/50 text-sm leading-relaxed">{svc.desc}</p>
                 </div>
               </div>
             );
           })}
         </div>
       </div>
    </section>
  );
}

export function FAQSection() {
  const faqs = [
    {
      q: "What core technologies does AlgorithmAze AI focus on?",
      a: "Our primary engineering domains are Smart Automation and the Internet of Things (IoT). We bridge the gap between digital AI logic and physical hardware systems, building custom solutions that eliminate operational friction for businesses."
    },
    {
      q: "How can my business collaborate with AlgorithmAze AI?",
      a: "We partner with startups and mid-market enterprises through our custom solutions wing. You can submit your specifications using our Project Intake form, and our engineering team will follow up within 24-48 hours with a clear, grounded technical scope."
    },
    {
      q: "What is the Tech Incubator & Talent Accelerator?",
      a: "Rather than a legacy classroom or training institute, our Tech Incubator & Talent Accelerator is a fast-paced co-building ecosystem. Selected students and aspiring developers collaborate directly on active startup products, wire physical IoT prototypes, and learn by shipping live code."
    },
    {
      q: "How does the Tech Incubator application process work?",
      a: "We value people who build things. The application process focuses on your proof of work, project portfolio, and builder mindset. Once you apply, our development team will review your projects and contact you for technical discussion."
    },
    {
      q: "Are the incubator tracks academically compliant?",
      a: "Yes. Our incubator tracks are fully compliant with UGC/AICTE guidelines, providing valid internship certificates, experience letters, and academic credit verification."
    }
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-dark-black relative z-20">
      <div className="container mx-auto px-6 lg:px-16">
        <SectionHeading title={<>FAQ<span className="text-electric-blue">s</span></>} subtitle="Transparent answers about our engineering focus, custom services, and Tech Incubator." />
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-ui !p-8 border border-white/5 hover:border-electric-blue/20 transition-all duration-300">
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
  const [activeTab, setActiveTab] = useState<'intake' | 'general'>('intake');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleSwitchTab = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setActiveTab(customEvent.detail);
      }
    };
    window.addEventListener('switch-contact-tab', handleSwitchTab);
    return () => window.removeEventListener('switch-contact-tab', handleSwitchTab);
  }, []);
  const [error, setError] = useState('');

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Smart Automation & IoT',
    timeline: 'Immediate (< 1 month)',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const payload = activeTab === 'intake'
      ? {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          isProjectIntake: true,
          projectType: formData.projectType,
          timeline: formData.timeline,
          message: formData.message
        }
      : {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          isProjectIntake: false,
          subject: formData.subject,
          message: formData.message
        };

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: 'Smart Automation & IoT',
          timeline: 'Immediate (< 1 month)',
          subject: '',
          message: ''
        });
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection error. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white/5 border-t border-white/5 relative z-20">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
          {/* Info Column */}
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Let's build <br/>
              <span className="text-electric-blue italic">something real.</span>
            </h2>
            <p className="text-cyan-50/60 text-lg mb-10 max-w-xl leading-relaxed">
              Whether you want to automate enterprise friction, deploy physical IoT controllers, or apply to our co-building Tech Incubator, reach out and we'll get down to business.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6 group">
                <a href="mailto:algorithmazeai@gmail.com" className="w-12 h-12 rounded-2xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <span className="material-symbols-outlined text-xl text-electric-blue">mail</span>
                </a>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest font-black">Direct Email</span>
                  <a href="mailto:algorithmazeai@gmail.com" className="text-white font-bold hover:text-electric-blue transition-colors">algorithmazeai@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <a href="tel:+917448991888" className="w-12 h-12 rounded-2xl bg-teal-green/10 border border-teal-green/20 flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <span className="material-symbols-outlined text-xl text-teal-green">phone</span>
                </a>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest font-black">Call / WhatsApp</span>
                  <a href="tel:+917448991888" className="text-white font-bold hover:text-teal-green transition-colors">+91 7448991888</a>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Aliya+Complex,+Gundur+Burma+Colony,+Trichy,+Tamil+Nadu+620007" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl text-white/75">location_on</span>
                </a>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest font-black">Startup Office</span>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Aliya+Complex,+Gundur+Burma+Colony,+Trichy,+Tamil+Nadu+620007" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-electric-blue transition-colors font-semibold text-sm"
                  >
                    Gundur Burma Colony, Trichy, Tamil Nadu
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="glass-ui !p-8 md:!p-10 border border-white/10 rounded-[2rem] relative overflow-hidden">
            {/* Tab Header */}
            <div className="flex border-b border-white/10 mb-8 pb-1">
              <button
                type="button"
                onClick={() => { setActiveTab('intake'); setSuccess(false); setError(''); }}
                className={`flex-1 pb-4 text-xs font-black uppercase tracking-widest text-center border-b-2 transition-all cursor-pointer ${activeTab === 'intake' ? 'border-electric-blue text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}
              >
                Hire Us (Project Intake)
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('general'); setSuccess(false); setError(''); }}
                className={`flex-1 pb-4 text-xs font-black uppercase tracking-widest text-center border-b-2 transition-all cursor-pointer ${activeTab === 'general' ? 'border-teal-green text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}
              >
                General Inquiry
              </button>
            </div>

            {success ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-teal-green/10 border border-teal-green/30 flex items-center justify-center text-teal-green mb-6 animate-pulse">
                  <span className="material-symbols-outlined text-3xl font-black">done</span>
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-3">Message Dispatched</h3>
                <p className="text-cyan-50/60 text-sm max-w-sm mx-auto leading-relaxed">
                  {activeTab === 'intake' 
                    ? "Got your project details. We are a lean team and review requests quickly. Expect a technical follow-up within 24-48 hours."
                    : "Thanks for reaching out! We have received your inquiry and will follow up shortly."}
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-8 px-6 py-2 bg-white/5 border border-white/10 hover:border-white/20 text-white font-bold uppercase tracking-widest text-[10px] rounded-lg transition-all"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-2 block">Full Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:border-electric-blue outline-none transition-all text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-2 block">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@company.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:border-electric-blue outline-none transition-all text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-2 block">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:border-electric-blue outline-none transition-all text-white text-sm"
                  />
                </div>

                {activeTab === 'intake' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-2 block">Core Priority / Service</label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full bg-dark-black border border-white/10 rounded-xl px-5 py-3.5 focus:border-electric-blue outline-none transition-all text-white text-sm cursor-pointer"
                      >
                        <option value="Smart Automation & IoT">Smart Automation & IoT</option>
                        <option value="AI Development & Solutions">AI Development & Solutions</option>
                        <option value="Business & Marketing Automation">Business & Marketing Automation</option>
                        <option value="B2B Enterprise Automation">B2B Enterprise Automation</option>
                        <option value="B2C Consumer Automation">B2C Consumer Automation</option>
                        <option value="Full Stack Development (MVP)">Full Stack Development (MVP)</option>
                        <option value="Other Startup Integration">Other Startup Integration</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-2 block">Timeline Priority</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full bg-dark-black border border-white/10 rounded-xl px-5 py-3.5 focus:border-electric-blue outline-none transition-all text-white text-sm cursor-pointer"
                      >
                        <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                        <option value="1-3 Months">1-3 Months</option>
                        <option value="3-6 Months">3-6 Months</option>
                        <option value="Flexible / Undefined">Flexible / Undefined</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-2 block">Subject</label>
                    <input
                      required={activeTab === 'general'}
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Question about your Incubator tracks"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:border-teal-green outline-none transition-all text-white text-sm"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-2 block">
                    {activeTab === 'intake' ? 'Project Scope & Requirements' : 'Your Message'}
                  </label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={activeTab === 'intake' ? "Briefly explain what you need to automate, what IoT features are required, or what constraints you have." : "How can we help you?"}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:border-electric-blue outline-none transition-all text-white text-sm resize-none"
                  ></textarea>
                </div>

                {error && (
                  <p className="text-red-400 text-xs font-semibold">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 bg-gradient-to-r ${activeTab === 'intake' ? 'from-electric-blue to-teal-green' : 'from-teal-green to-electric-blue'} text-dark-black font-black uppercase tracking-widest text-xs rounded-xl shadow-[0_10px_30px_rgba(0,255,198,0.2)] hover:shadow-[0_10px_30px_rgba(0,255,198,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center`}
                >
                  {loading ? 'Dispatched...' : activeTab === 'intake' ? 'Submit Project Details' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AudienceSection() {
  const navigate = useNavigate();
  const lenis = useLenis();

  const handleScrollToContact = (tabName: 'intake' | 'general') => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      window.dispatchEvent(new CustomEvent('switch-contact-tab', { detail: tabName }));
      if (lenis) {
        lenis.scrollTo('#contact');
      } else {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const audiences = [
    {
      title: "B2B / Businesses",
      subtitle: "Enterprise Efficiency",
      desc: "Cut operational overhead, automate high-friction workflows, track assets in real time via IoT, and eliminate manual bottlenecks with custom-built software-hardware ecosystems.",
      features: [
        "Programmable Workflow Integrations",
        "Edge Device & Sensor Asset Tracking",
        "CRM & Invoice Automation Pipelines",
        "24-48h Structured Technical Intake Reviews"
      ],
      btnText: "Initiate B2B Intake",
      accent: "electric-blue",
      onClick: () => handleScrollToContact('intake')
    },
    {
      title: "B2C / End Users",
      subtitle: "Custom Consumer Tech",
      desc: "Build highly responsive mobile and web applications designed to streamline daily routines, optimize consumer workflows, and provide instant functional value to end users.",
      features: [
        "Scalable Cloud-Native Infrastructures",
        "Intuitive User Experience Layouts",
        "Integrated AI Helper Modules",
        "Zero-Lock-in Rapid MVP Prototypes"
      ],
      btnText: "Inquire Custom Application",
      accent: "teal-green",
      onClick: () => handleScrollToContact('intake')
    },
    {
      title: "Students / Talent",
      subtitle: "Internship & Training & Accelerator",
      desc: "Join our fast-paced co-building ecosystem. Collaborate directly on active startup products, wire physical hardware sensors, write production code, and prove your capabilities.",
      features: [
        "Industrial IoT & AI Co-Building Tracks",
        "100% Practical Proof of Work Focus",
        "UGC / AICTE Academic Credit Compliant",
        "Mentorship from Core Tech Founders"
      ],
      btnText: "Apply to Internship & Training",
      accent: "white",
      onClick: () => navigate("/internships")
    }
  ];

  return (
    <section id="audiences" className="py-24 md:py-32 bg-dark-black relative z-20 border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-teal-green/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeading 
          title={<>Target <span className="text-teal-green">Architecture</span></>} 
          subtitle="Engineered paths built specifically for enterprises, consumers, and aspiring builders." 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 max-w-6xl mx-auto">
          {audiences.map((aud, i) => {
            const isElectric = aud.accent === 'electric-blue';
            const isTeal = aud.accent === 'teal-green';
            
            let cardBorderClass = 'hover:border-white/40 border-white/10';
            let btnClass = 'bg-white/5 hover:bg-white/10 text-white border-white/15';
            let glowColor = 'bg-white/5';

            if (isElectric) {
              cardBorderClass = 'hover:border-electric-blue/40 border-white/10';
              btnClass = 'bg-electric-blue/10 hover:bg-electric-blue hover:text-dark-black text-electric-blue border-electric-blue/20';
              glowColor = 'bg-electric-blue/10';
            } else if (isTeal) {
              cardBorderClass = 'hover:border-teal-green/40 border-white/10';
              btnClass = 'bg-teal-green/10 hover:bg-teal-green hover:text-dark-black text-teal-green border-teal-green/20';
              glowColor = 'bg-teal-green/10';
            }

            return (
              <div 
                key={i} 
                className={`glass-ui relative overflow-hidden group border transition-all duration-500 rounded-[2.5rem] !p-8 md:!p-10 flex flex-col justify-between min-h-[480px] ${cardBorderClass}`}
              >
                <div className={`absolute -top-12 -right-12 w-36 h-36 blur-3xl rounded-full pointer-events-none transition-all duration-700 ${glowColor} group-hover:scale-125`} />
                
                <div>
                  <div className="mb-6">
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">{aud.subtitle}</span>
                    <h3 className="text-2xl md:text-3xl font-black mt-1 leading-tight group-hover:text-opacity-80 transition-colors text-white">
                      {aud.title}
                    </h3>
                  </div>

                  <p className="text-cyan-50/70 text-sm md:text-base font-light mb-8 leading-relaxed">
                    {aud.desc}
                  </p>

                  <ul className="space-y-3.5 mb-8">
                    {aud.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-white/80">
                        <div className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center ${isElectric ? 'bg-electric-blue/10 text-electric-blue' : isTeal ? 'bg-teal-green/10 text-teal-green' : 'bg-white/10 text-white'}`}>
                          <span className="material-symbols-outlined text-[10px] font-bold">done</span>
                        </div>
                        <span className="text-xs md:text-sm font-semibold">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={aud.onClick}
                  className={`w-full text-center py-3.5 border font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all duration-300 cursor-pointer ${btnClass}`}
                >
                  {aud.btnText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
