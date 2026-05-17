import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark-black pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-electric-blue/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img src="/images/amlogo.png" alt="AlgorithmazeAI Logo" className="w-10 h-10 object-contain" />
              <span className="text-xl font-extrabold text-white">Algorithmaze<span className="text-electric-blue">AI</span></span>
            </div>
            <p className="text-cyan-50/50 text-sm leading-relaxed mb-6">
              Infinite Intelligence. Endless Innovation.<br/>
              Delivering the best training and knowledge needed for the future serving in AI and Robotics world.
            </p>
            <div className="flex space-x-4">
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Masterminds', 'Projects', 'Courses', 'Internships'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-cyan-50/50 hover:text-electric-blue transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Programs</h4>
            <ul className="space-y-4">
              {['AI Bootcamp', 'Robotics & IoT', 'Fullstack AI', 'UI/UX Design'].map(item => (
                <li key={item}>
                  <a href="#courses" className="text-cyan-50/50 hover:text-teal-green transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Location</h4>
            <p className="text-cyan-50/50 text-sm leading-relaxed mb-4">
              Aliya Complex, Gundur Burma Colony,<br />
              (Near OFT Arch / Mathur Roundana) Trichy - Pudukkottai Main Road,<br />
              Trichy, Tamil Nadu 620007<br />
              India
            </p>
            <p className="text-electric-blue font-bold text-sm">+91 7448991888</p>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-cyan-50/30 text-xs">
            © {new Date().getFullYear()} AlgorithmazeAI. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-cyan-50/30 hover:text-white transition-colors text-xs">Privacy Policy</a>
            <a href="#" className="text-cyan-50/30 hover:text-white transition-colors text-xs">Terms of Service</a>
            <Link to="/amaiadmin" className="text-cyan-50/30 hover:text-white transition-colors text-xs">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
