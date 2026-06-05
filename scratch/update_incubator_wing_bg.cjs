const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'ContentSections.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `{/* Card B: Incubator & Accelerator */}
          <div className="glass-ui relative overflow-hidden group hover:border-teal-green/40 border border-white/10 transition-all duration-500 rounded-[2.5rem] !p-8 md:!p-12 flex flex-col justify-between min-h-[500px]">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-green/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-teal-green/20 transition-all duration-700" />
            
            <div>
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
              className="w-full text-center py-4 bg-white/5 border border-white/10 hover:border-teal-green hover:bg-teal-green hover:text-dark-black text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all duration-300 cursor-pointer"
            >
              Apply to Internship & Training
            </button>
          </div>`;

const replacementStr = `{/* Card B: Incubator & Accelerator */}
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
          </div>`;

// Normalize function for safety
const normalize = str => str.replace(/\r\n/g, '\n').replace(/\s+/g, ' ').trim();

if (!normalize(content).includes(normalize(targetStr))) {
  console.error("Could not find the target Card B block in ContentSections.tsx!");
  process.exit(1);
}

const startIdx = content.indexOf('Card B: Incubator & Accelerator');
if (startIdx === -1) {
  console.error("Could not locate card comment in ContentSections.tsx!");
  process.exit(1);
}

const prevCardIdx = content.lastIndexOf('{/* Card B: Incubator & Accelerator */}', startIdx);
if (prevCardIdx === -1) {
  console.error("Could not find Card B comment start!");
  process.exit(1);
}

const applyIdx = content.indexOf('Apply to Internship & Training', startIdx);
if (applyIdx === -1) {
  console.error("Could not find Apply to Internship & Training text!");
  process.exit(1);
}
const closingButtonIdx = content.indexOf('</button>', applyIdx);
if (closingButtonIdx === -1) {
  console.error("Could not find closing button of Card B!");
  process.exit(1);
}

const finalIdx = closingButtonIdx + 9;

const beforePart = content.substring(0, prevCardIdx);
const afterPart = content.substring(finalIdx);

const updatedContent = beforePart + replacementStr + afterPart;
fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log("Successfully updated Card B with background image!");
