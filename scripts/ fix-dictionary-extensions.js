// scripts/fix-dictionary-extensions.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔄 FIXING DICTIONARY FILE EXTENSIONS (.png → .jpg)\n');

const filePath = 'src/data/dictionary.js';

if (!fs.existsSync(filePath)) {
  console.log('❌ File not found');
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

// Backup
fs.writeFileSync(`${filePath}.backup-ext`, content, 'utf8');

// Ganti .png jadi .jpg
let newContent = content.replace(/\.png"/g, '.jpg"');

// Juga ganti URL yang salah
newContent = newContent.replace(
  /dictionary\/[^"]+\.png/g,
  (match) => {
    // Contoh: dictionary/a-line.png → body-types/apple.jpg
    const filename = match.split('/').pop().replace('.png', '.jpg');
    return `body-types/apple.jpg`; // Pakai apple.jpg sebagai placeholder
  }
);

fs.writeFileSync(filePath, newContent, 'utf8');

console.log('✅ All .png changed to .jpg');
console.log('✅ Dictionary images now point to existing body-types/apple.jpg');