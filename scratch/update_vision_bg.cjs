const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'ContentSections.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `{/* Vision Card */}
          <div className="glass-ui relative overflow-hidden group hover:border-electric-blue/40 border border-white/10 transition-all duration-500 rounded-[2rem] !p-10 flex flex-col items-start">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-electric-blue/10 blur-3xl rounded-full pointer-events-none group-hover:bg-electric-blue/20 transition-all duration-700" />
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-electric-blue/40 group-hover:scale-110 transition-all">
              <span className="material-symbols-outlined text-3xl text-electric-blue">visibility</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-wider group-hover:text-electric-blue transition-colors">
              Our Vision
            </h3>
            <p className="text-cyan-50/70 text-lg font-light leading-relaxed">
              To eliminate operational friction globally by connecting the digital intelligence of AI with the physical world of IoT and Automation.
            </p>
          </div>`;

const replacementStr = `{/* Vision Card */}
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
          </div>`;

// Normalize function for safety
const normalize = str => str.replace(/\r\n/g, '\n').replace(/\s+/g, ' ').trim();

if (!normalize(content).includes(normalize(targetStr))) {
  console.error("Could not find the target Vision Card block in ContentSections.tsx!");
  process.exit(1);
}

// Let's replace the block using exact content indexing or find and replace
// To be extremely safe, we do string replacement on normalisation or exact match
// Let's do exact match replacement by looking for parts of the target
const startIdx = content.indexOf('Our Vision');
if (startIdx === -1) {
  console.error("Could not locate 'Our Vision' in ContentSections.tsx!");
  process.exit(1);
}

// Find previous `/* Vision Card */` before 'Our Vision'
const prevCardIdx = content.lastIndexOf('{/* Vision Card */}', startIdx);
if (prevCardIdx === -1) {
  console.error("Could not find Vision Card comment!");
  process.exit(1);
}

// Find next closing `</div>` after the paragraph
const pIdx = content.indexOf('To eliminate operational friction globally by connecting the digital intelligence', startIdx);
if (pIdx === -1) {
  console.error("Could not find description text!");
  process.exit(1);
}
const closingDivIdx = content.indexOf('</div>', pIdx);
if (closingDivIdx === -1) {
  console.error("Could not find closing div of Vision Card!");
  process.exit(1);
}

const finalIdx = closingDivIdx + 6; // Include the closing div length

const beforePart = content.substring(0, prevCardIdx);
const afterPart = content.substring(finalIdx);

const updatedContent = beforePart + replacementStr + afterPart;
fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log("Successfully updated Vision Card with background image!");
