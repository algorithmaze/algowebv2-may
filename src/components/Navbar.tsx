import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "About", href: "/about" },
    { name: "Training", href: "/courses" },
    { name: "Internship", href: "/internships" },
    { name: "Contact", href: "/#contact" },
  ];

  const lenis = useLenis();
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;
    
    if (href.startsWith('/#')) {
      if (location.pathname === '/') {
        const targetId = href.replace("/#", "#");
        if (lenis) {
          lenis.scrollTo(targetId);
        } else {
          const elem = document.getElementById(targetId.replace("#", ""));
          elem?.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 transition-all duration-500 ${isScrolled ? 'backdrop-blur-xl bg-dark-black/70 border-b border-white/10 shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group shrink-0" 
          onClick={() => {
            if (location.pathname === '/') {
              if (lenis) lenis.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate('/');
            }
          }}
        >
          <img src="/images/amlogo.png" alt="AlgorithmAze AI Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(0,255,198,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(0,255,198,0.6)]" />
          <span className="text-xl md:text-2xl font-extrabold font-sans tracking-tight text-white flex items-center">
            Algorithmaze<span className="text-electric-blue">AI</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={handleScrollTo}
              className="text-xs xl:text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-electric-blue transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#00E5FF]" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex items-center shrink-0">
          <a href="/courses" onClick={handleScrollTo} className="hidden md:block">
            <Button 
              className="bg-gradient-to-r from-electric-blue to-teal-green hover:brightness-110 text-dark-black font-black uppercase tracking-widest text-[10px] px-6 py-2.5 rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(0,229,255,0.7)] hover:scale-105 transition-all duration-300 border-none flex cursor-pointer"
            >
              Explore Training
            </Button>
          </a>
          
          {/* Mobile Menu Button (Hamburger) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden ml-4 text-white hover:text-electric-blue p-2 transition-colors relative z-50"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-dark-black/95 backdrop-blur-2xl z-40 transition-all duration-500 flex flex-col items-center justify-center lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex flex-col items-center space-y-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={handleScrollTo}
              className="text-2xl font-black uppercase tracking-[0.2em] text-white/50 hover:text-electric-blue transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
          <a href="/courses" onClick={handleScrollTo} className="mt-8">
            <Button className="bg-electric-blue text-dark-black font-black uppercase tracking-widest px-10 py-6 rounded-2xl text-lg">
              Explore Training
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
}
