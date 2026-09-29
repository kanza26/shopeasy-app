// Simple smoke test
console.log('Running smoke test...');

// Check if all required files exist
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'src/index.js',
  'src/db.js',
  'src/routes/products.js',
  'src/routes/orders.js',
];

let allExist = true;
for (const file of requiredFiles) {
  const fullPath = path.join(__dirname, '..', file);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} MISSING`);
    allExist = false;
  }
}

if (!allExist) {
  process.exit(1);
}

console.log('All smoke tests passed!');
