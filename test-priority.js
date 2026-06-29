// Stub browser globals so script.js loads in Node without errors
global.localStorage = { getItem: () => null, setItem: () => {} };
global.document = {
  getElementById: () => ({ innerHTML: '', checked: false, appendChild: () => {} }),
  createElement: () => ({
    setAttribute: () => {},
    classList: { add: () => {} },
    appendChild: () => {},
    innerHTML: '',
  }),
  querySelector: () => null,
};

// Load the source (eval keeps calculatePriority in this scope)
const fs = require('fs');
eval(fs.readFileSync('./src/script.js', 'utf8'));

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  PASS  ${message}`);
    passed++;
  } else {
    console.error(`  FAIL  ${message}`);
    failed++;
  }
}

// Tomorrow's date as YYYY-MM-DD (dynamic so the test stays correct over time)
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = tomorrow.toISOString().split('T')[0];

console.log(`\nRunning calculatePriority tests (tomorrow = ${tomorrowStr})\n`);

// Case 1: due tomorrow, weight=8, estimatedTime=2h → should clamp to 5
//   base 1 + dueDate<=1 (+3) + weight>=7 (+2.5) + est<=3 (+1) = 7.5 → clamped to 5
const p1 = calculatePriority(8, tomorrowStr, 2, false);
assert(p1 === 5, `due tomorrow, weight=8, est=2h  → expected 5, got ${p1}`);

// Case 2: completed task → should always return '-'
const p2 = calculatePriority(8, tomorrowStr, 2, true);
assert(p2 === '-', `completed task              → expected '-', got ${p2}`);

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
