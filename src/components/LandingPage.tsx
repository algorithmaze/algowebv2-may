import HeroSequence from "./HeroSequence";
import FloatingText from "./FloatingText";
import Navbar from "./Navbar";
import { ProjectsSection, TeamSection, ContactSection, FeaturesSection, FAQSection } from "./ContentSections";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import Footer from "./Footer";
import { useLenis } from "lenis/react";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    restDelta: 0.001
  });

  const lenis = useLenis();

  useEffect(() => {
    // Handle initial hash scroll if arriving from another page
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const targetId = hash.replace("#", "");
        if (lenis) {
          lenis.scrollTo(`#${targetId}`);
        } else {
          const elem = document.getElementById(targetId);
          elem?.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // Small delay to ensure content is rendered
    }
  }, [lenis]);

  // Fade out scroll indicator immediately as we scroll - only visible at the very top
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.01], [1, 0]);



  return (
    <div id="home" className="relative bg-dark-black text-white selection:bg-electric-blue selection:text-dark-black font-sans min-h-screen">
      <Navbar />

      {/* Blinking Scroll Indicator */}
      <motion.div 
        style={{ opacity: scrollIndicatorOpacity }}
        className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-electric-blue/70 animate-pulse">
            Scroll Down to experience the site
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-electric-blue to-transparent animate-bounce" />
        </div>
      </motion.div>
      
      <main ref={containerRef} className="relative w-full h-[700vh]">
        <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
          <div className="absolute inset-0 z-10 bg-noise opacity-[0.03] pointer-events-none" />
          <HeroSequence totalFrames={60} progress={smoothProgress} />
          <FloatingText progress={smoothProgress} start={0.0} end={0.16} leftText={<>Unlock The<br/><span className="text-electric-blue drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">Power of AI.</span></>} rightText="Every future begins with wonder." />
          <FloatingText progress={smoothProgress} start={0.16} end={0.33} reverse={true} leftText={<>Code The<br/><span className="text-teal-green drop-shadow-[0_0_15px_rgba(0,255,198,0.4)]">Impossible.</span></>} rightText="Imagination becomes real." />
          <FloatingText progress={smoothProgress} start={0.33} end={0.5} leftText={<>Master Machine<br/><span className="text-electric-blue drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">Learning.</span></>} rightText="Learn beyond limits." />
          <FloatingText progress={smoothProgress} start={0.5} end={0.66} reverse={true} leftText={<>Build The<br/><span className="text-teal-green drop-shadow-[0_0_15px_rgba(0,255,198,0.4)]">Future.</span></>} rightText="Create the impossible." />
          <FloatingText progress={smoothProgress} start={0.66} end={0.83} leftText={<>Unleash<br/><span className="text-electric-blue drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">Innovation.</span></>} rightText="Infinite Intelligence." />
          <FloatingText progress={smoothProgress} start={0.83} end={1.0} isLast={true} reverse={true} leftText={<>Shape Tomorrow,<br/><span className="text-teal-green drop-shadow-[0_0_15px_rgba(0,255,198,0.4)]">Today.</span></>} rightText={<div className="flex flex-col items-start gap-8"><p>Join AlgorithmazeAI and shape the future.</p><a href="/courses" className="px-8 py-4 text-lg bg-gradient-to-r from-electric-blue to-teal-green text-dark-black font-extrabold rounded-full shadow-[0_0_20px_rgba(0,255,198,0.4)] hover:shadow-[0_0_40px_rgba(0,255,198,0.8)] hover:scale-105 transition-all duration-300 cursor-pointer pointer-events-auto inline-block">Join the Revolution</a></div>} />
        </div>
      </main>

      <div className="relative z-20 w-full bg-dark-black">
        <TeamSection />
        <ProjectsSection />
        <FeaturesSection />
        
        <section className="py-24 relative border-t border-white/5 bg-dark-black z-20 overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-blue/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white">Explore Our Programs</h2>
            <p className="text-lg text-cyan-50/70 mb-10 max-w-2xl mx-auto">Ready to shape the future? Join our expert-led courses or launch your career with our internship programs.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/courses" className="px-8 py-4 bg-gradient-to-r from-electric-blue to-teal-green text-dark-black font-extrabold rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all transform hover:-translate-y-1">View Courses</Link>
              <Link to="/internships" className="px-8 py-4 bg-white/10 text-white font-extrabold rounded-full hover:bg-white/20 border border-white/20 transition-all transform hover:-translate-y-1">View Internships</Link>
            </div>
          </div>
        </section>
        <FAQSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
