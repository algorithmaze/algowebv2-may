const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'ContentSections.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `{/* Card A: AlgorithmAze AI - Solutions */}
          <div className="glass-ui relative overflow-hidden group hover:border-electric-blue/40 border border-white/10 transition-all duration-500 rounded-[2.5rem] !p-8 md:!p-12 flex flex-col justify-between min-h-[500px]">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-electric-blue/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-electric-blue/20 transition-all duration-700" />
            
            <div>
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
              className="w-full text-center py-4 bg-white/5 border border-white/10 hover:border-electric-blue hover:bg-electric-blue hover:text-dark-black text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all duration-300"
            >
              Explore Solutions
            </a>`;

const replacementStr = `{/* Card A: Algorithmaze AI - Solutions */}
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
            </a>`;

// Normalize function for safety
const normalize = str => str.replace(/\r\n/g, '\n').replace(/\s+/g, ' ').trim();

if (!normalize(content).includes(normalize(targetStr))) {
  console.error("Could not find the target Card A block in ContentSections.tsx!");
  process.exit(1);
}

const startIdx = content.indexOf('Card A: AlgorithmAze AI - Solutions');
if (startIdx === -1) {
  console.error("Could not locate card comment in ContentSections.tsx!");
  process.exit(1);
}

// Find previous `{/* Card A: AlgorithmAze AI - Solutions */}`
const prevCardIdx = content.lastIndexOf('{/* Card A: AlgorithmAze AI - Solutions */}', startIdx);
if (prevCardIdx === -1) {
  console.error("Could not find Card A comment start!");
  process.exit(1);
}

// Find next closing `Explore Solutions\n            </a>`
const exploreIdx = content.indexOf('Explore Solutions', startIdx);
if (exploreIdx === -1) {
  console.error("Could not find Explore Solutions text!");
  process.exit(1);
}
const closingAIdx = content.indexOf('</a>', exploreIdx);
if (closingAIdx === -1) {
  console.error("Could not find closing a of Card A!");
  process.exit(1);
}

const finalIdx = closingAIdx + 4;

const beforePart = content.substring(0, prevCardIdx);
const afterPart = content.substring(finalIdx);

const updatedContent = beforePart + replacementStr + afterPart;
fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log("Successfully updated Card A with background image!");
