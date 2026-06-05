const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\ANTONY AI\\.gemini\\antigravity-ide\\brain\\d5fd99a6-2a3b-41d2-95ca-38edca7b8664\\.system_generated\\logs\\transcript.jsonl';

const lines = fs.readFileSync(logPath, 'utf8').split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  try {
    const data = JSON.parse(line);
    // Look in tool_calls
    if (data.tool_calls) {
      for (const call of data.tool_calls) {
        if (call.name === 'write_to_file' && call.args && call.args.TargetFile && call.args.TargetFile.includes('implementation_plan.md')) {
          console.log(`--- Write to implementation_plan.md in step ${data.step_index} ---`);
          console.log(call.args.CodeContent);
        }
      }
    }
  } catch (e) {
    // ignore parse errors
  }
}
