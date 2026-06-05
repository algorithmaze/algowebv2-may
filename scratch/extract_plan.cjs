const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\ANTONY AI\\.gemini\\antigravity-ide\\brain\\d5fd99a6-2a3b-41d2-95ca-38edca7b8664\\.system_generated\\logs\\transcript.jsonl';

const lines = fs.readFileSync(logPath, 'utf8').split('\n');
let latestPlan = null;
let step = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  try {
    const data = JSON.parse(line);
    if (data.tool_calls) {
      for (const call of data.tool_calls) {
        if (call.name === 'write_to_file' && call.args && call.args.TargetFile && call.args.TargetFile.includes('implementation_plan.md')) {
          latestPlan = call.args.CodeContent;
          step = data.step_index;
        }
      }
    }
  } catch (e) {
    // ignore
  }
}

if (latestPlan) {
  // If it is a string representing a JSON string, parse it
  if (latestPlan.startsWith('"')) {
    try {
      latestPlan = JSON.parse(latestPlan);
    } catch (e) {
      // ignore
    }
  }
  const targetPath = path.join(__dirname, 'full_implementation_plan.md');
  fs.writeFileSync(targetPath, latestPlan, 'utf8');
  console.log(`Saved plan from step ${step} to ${targetPath}`);
} else {
  console.log('No implementation plan found in logs.');
}
