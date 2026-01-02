// check-deps.js
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const requiredDeps = [
  'next',
  'react',
  'react-dom',
  'googleapis',
  'date-fns',
  'react-hot-toast',
  'clsx',
  'tailwind-merge'
];

console.log('🔍 Checking dependencies...\n');

let allOk = true;

requiredDeps.forEach(dep => {
  if (packageJson.dependencies[dep]) {
    console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
  } else {
    console.log(`❌ ${dep}: MISSING`);
    allOk = false;
  }
});

console.log('\n' + (allOk ? '🎉 All dependencies present!' : '⚠️ Some dependencies missing!'));

// Exit code untuk GitHub Actions
process.exit(allOk ? 0 : 1);
