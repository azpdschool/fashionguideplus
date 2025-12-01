// scripts/check-files.js
import { readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('📁 CHECKING PROJECT STRUCTURE\n');

function checkDir(path, name) {
  if (existsSync(path)) {
    const files = readdirSync(path);
    console.log(`✅ ${name}:`);
    files.forEach(f => console.log(`   📄 ${f}`));
  } else {
    console.log(`❌ ${name}: Directory not found`);
  }
  console.log('');
}

// Check important directories
checkDir(join(__dirname, '../src/data'), 'src/data/');
checkDir(join(__dirname, '../api/data/fashion'), 'api/data/fashion/');
checkDir(join(__dirname, '../public/images/fashion'), 'public/images/fashion/');

console.log('📊 SUMMARY:');
console.log('1. Data files should be in src/data/');
console.log('2. API handlers in api/data/fashion/');
console.log('3. Local images in public/images/fashion/');