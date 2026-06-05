import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-dark-black text-white selection:bg-teal-green selection:text-dark-black font-sans min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-blue/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-12 border-b border-white/5 pb-8">
              <span className="px-4 py-1.5 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-xs font-black uppercase tracking-widest text-electric-blue inline-block mb-6">
                Data Transparency
              </span>
              <h1 className="text-4xl md:text-6xl font-black uppercase">
                Privacy <span className="text-electric-blue italic">Policy</span>
              </h1>
              <p className="text-white/40 text-xs mt-4 uppercase tracking-widest font-bold">Last Updated: June 2026</p>
            </div>

            {/* Content sections */}
            <div className="space-y-12">
              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider">1. Data Security</h3>
                <p className="text-cyan-50/60 leading-relaxed text-base font-light">
                  All user data, client metrics, project scope details, and incubator application details are stored strictly in secure internal databases owned and operated by **AlgorithmAze AI**. We deploy standard encryption protocols to protect your information from unauthorized access, loss, or alteration.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider">2. Internal Purpose Only</h3>
                <p className="text-cyan-50/60 leading-relaxed text-base font-light">
                  Information collected through our project intake form, contact form, or incubator applications is used exclusively for project scoping, communication, product optimization, and incubator recruitment. 
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-teal-green uppercase tracking-wider">3. Zero Third-Party Sharing</h3>
                <div className="p-8 bg-teal-green/5 border border-teal-green/20 rounded-2xl">
                  <p className="text-teal-green font-bold text-lg mb-2">Our Strict Commitment:</p>
                  <p className="text-cyan-50/70 leading-relaxed text-sm font-light">
                    AlgorithmAze AI maintains a strict zero-tolerance policy for third-party data sharing. We do not sell, rent, trade, or otherwise distribute your personal details, email addresses, phone numbers, or project information to outside marketers, advertisers, or third-party entities.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider">4. Contact Information</h3>
                <p className="text-cyan-50/60 leading-relaxed text-base font-light">
                  If you have any questions regarding your data or wish to request data deletion, you can reach out directly to our core operations team:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2 text-sm max-w-sm">
                  <p><strong className="text-white">Email:</strong> <a href="mailto:algorithmazeai@gmail.com" className="text-electric-blue">algorithmazeai@gmail.com</a></p>
                  <p><strong className="text-white">Phone:</strong> <span className="text-electric-blue">+91 7448991888</span></p>
                  <p><strong className="text-white">Office Address:</strong> Aliya Complex, Gundur Burma Colony, Trichy, India</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
