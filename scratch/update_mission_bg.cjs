const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'ContentSections.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `{/* Mission Card */}
          <div className="glass-ui relative overflow-hidden group hover:border-teal-green/40 border border-white/10 transition-all duration-500 rounded-[2rem] !p-10 flex flex-col items-start">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-green/10 blur-3xl rounded-full pointer-events-none group-hover:bg-teal-green/20 transition-all duration-700" />
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-teal-green/40 group-hover:scale-110 transition-all">
              <span className="material-symbols-outlined text-3xl text-teal-green">track_changes</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-wider group-hover:text-teal-green transition-colors">
              Our Mission
            </h3>
            <p className="text-cyan-50/70 text-lg font-light leading-relaxed">
              To engineer practical software and hardware tools that solve B2B/B2C bottlenecks, while accelerating aspiring talent in an immersive incubator that values proof of work.
            </p>
          </div>`;

const replacementStr = `{/* Mission Card */}
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
          </div>`;

// Normalize function for safety
const normalize = str => str.replace(/\r\n/g, '\n').replace(/\s+/g, ' ').trim();

if (!normalize(content).includes(normalize(targetStr))) {
  console.error("Could not find the target Mission Card block in ContentSections.tsx!");
  process.exit(1);
}

// Find position of Our Mission block starting search after 'Our Vision' to avoid matching the first card
const visionIdx = content.indexOf('Our Vision');
if (visionIdx === -1) {
  console.error("Could not locate 'Our Vision' in ContentSections.tsx!");
  process.exit(1);
}

const startIdx = content.indexOf('Our Mission', visionIdx);
if (startIdx === -1) {
  console.error("Could not locate 'Our Mission' in ContentSections.tsx!");
  process.exit(1);
}

// Find previous `/* Mission Card */` before 'Our Mission'
const prevCardIdx = content.lastIndexOf('{/* Mission Card */}', startIdx);
if (prevCardIdx === -1) {
  console.error("Could not find Mission Card comment!");
  process.exit(1);
}

// Find next closing `</div>` after the paragraph
const pIdx = content.indexOf('To engineer practical software and hardware tools that solve B2B/B2C bottlenecks', startIdx);
if (pIdx === -1) {
  console.error("Could not find description text!");
  process.exit(1);
}
const closingDivIdx = content.indexOf('</div>', pIdx);
if (closingDivIdx === -1) {
  console.error("Could not find closing div of Mission Card!");
  process.exit(1);
}

const finalIdx = closingDivIdx + 6; // Include the closing div length

const beforePart = content.substring(0, prevCardIdx);
const afterPart = content.substring(finalIdx);

const updatedContent = beforePart + replacementStr + afterPart;
fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log("Successfully updated Mission Card with background image!");
