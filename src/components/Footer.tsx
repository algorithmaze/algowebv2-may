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
              <img src="/images/amlogo.png" alt="AlgorithmAze AI Logo" className="w-10 h-10 object-contain" />
              <span className="text-xl font-extrabold text-white">AlgorithmAze<span className="text-electric-blue">AI</span></span>
            </div>
            <p className="text-cyan-50/50 text-sm leading-relaxed mb-6">
              High-Execution IoT, AI, and Automation Solutions.<br/>
              Building digital and physical systems that eliminate friction for businesses and consumers.
            </p>
            <div className="flex space-x-4">
              
            </div>
          </div>

          {/* AlgorithmAze AI - Solutions */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Solutions</h4>
            <ul className="space-y-4">
              {[
                { name: 'Smart Automation & IoT', href: '/#services' },
                { name: 'AI & Core Solutions', href: '/#services' },
                { name: 'Business Automation', href: '/#services' },
                { name: 'B2B Enterprise Solutions', href: '/#services' }
              ].map(item => (
                <li key={item.name}>
                  <a href={item.href} className="text-cyan-50/50 hover:text-electric-blue transition-colors text-sm">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Training & Labs - Hub */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Training & Labs</h4>
            <ul className="space-y-4">
              {[
                { name: 'Industrial IoT Labs', href: '/courses' },
                { name: 'AI R&D Internships', href: '/internships' },
                { name: 'Full Stack Development', href: '/courses' },
                { name: 'Startup Incubator', href: '/internships' }
              ].map(item => (
                <li key={item.name}>
                  <a href={item.href} className="text-cyan-50/50 hover:text-teal-green transition-colors text-sm">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Location</h4>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Aliya+Complex,+Gundur+Burma+Colony,+Trichy,+Tamil+Nadu+620007"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-50/50 hover:text-electric-blue transition-colors text-sm leading-relaxed mb-4 block"
            >
              Aliya Complex, Gundur Burma Colony,<br />
              (Near OFT Arch / Mathur Roundana) Trichy - Pudukkottai Main Road,<br />
              Trichy, Tamil Nadu 620007<br />
              India
            </a>
            <a href="tel:+917448991888" className="text-electric-blue hover:text-white transition-colors font-bold text-sm mb-1 block">+91 7448991888</a>
            <a href="mailto:algorithmazeai@gmail.com" className="text-cyan-50/50 hover:text-electric-blue transition-colors text-sm block">algorithmazeai@gmail.com</a>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-cyan-50/30 text-xs">
            © {new Date().getFullYear()} AlgorithmAze AI. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <Link to="/privacy" className="text-cyan-50/30 hover:text-white transition-colors text-xs">Privacy Policy</Link>
            <Link to="/about" className="text-cyan-50/30 hover:text-white transition-colors text-xs">About Us</Link>
            <Link to="/amaiadmin" className="text-cyan-50/30 hover:text-white transition-colors text-xs">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
