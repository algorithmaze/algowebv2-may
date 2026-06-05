const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'ContentSections.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Define the two replacements
const targetVar = "const isB2C = svc.title === 'B2C Consumer Automation';";
const replacementVar = "const isB2C = svc.title === 'B2C Consumer Automation';\n              const isFullStack = svc.title === 'Full Stack Development';";

if (!content.includes(targetVar)) {
  console.error("Could not find targetVar in file!");
  process.exit(1);
}

content = content.replace(targetVar, replacementVar);

// Simple replacement ignoring line ending differences
// We find targetRender by normalising, or replace it carefully
const pos = content.indexOf('backgroundImage: \'url(/images/b2c_bg.png)\'');
if (pos === -1) {
  console.error("Could not find b2c_bg positions!");
  process.exit(1);
}

// Let's locate the closing block of isB2C after the found position
const afterPos = content.indexOf(')}', pos);
if (afterPos === -1) {
  console.error("Could not find end of isB2C block!");
  process.exit(1);
}

const insertionPoint = afterPos + 2;
const before = content.substring(0, insertionPoint);
const after = content.substring(insertionPoint);

const insertText = `\n                  {isFullStack && (
                     <div 
                       className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 pointer-events-none z-0"
                       style={{ 
                         backgroundImage: 'url(/images/fullstack_bg.png)'
                       }}
                     />
                   )}`;

const newContent = before + insertText + after;

fs.writeFileSync(filePath, newContent, 'utf8');
console.log("Successfully updated ContentSections.tsx!");
