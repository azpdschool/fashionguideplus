// scripts/fix-categories.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 FIXING CATEGORIES.JS IMAGES\n');

const SUPABASE_URL = 'https://iabqihvrkrhkawctlthj.supabase.co';
const BUCKET = 'fashion';

const filePath = 'src/data/categories.js';

if (!fs.existsSync(filePath)) {
  console.log('❌ File not found:', filePath);
  process.exit(1);
}

console.log(`📄 Reading: ${filePath}`);

// Baca file
let content = fs.readFileSync(filePath, 'utf8');

// Cek struktur file
console.log('Content preview (first 200 chars):');
console.log(content.substring(0, 200) + '...\n');

// Cari semua image paths dengan berbagai pola
const imageRegex = /image:\s*['"]([^'"]+)['"]/g;
const matches = [...content.matchAll(imageRegex)];

console.log(`Found ${matches.length} image references`);

if (matches.length === 0) {
  // Coba pola lain
  const altRegex = /['"](\/images\/fashion\/[^'"]+)['"]/g;
  const altMatches = [...content.matchAll(altRegex)];
  console.log(`Found ${altMatches.length} paths with alt pattern`);
  
  if (altMatches.length > 0) {
    console.log('Example paths found:');
    altMatches.slice(0, 3).forEach(m => console.log(`  ${m[1]}`));
  }
}

// Backup
fs.writeFileSync(`${filePath}.backup3`, content, 'utf8');
console.log('💾 Backup created');

// Simple replace - ganti semua /images/fashion/ dengan URL Supabase
const newContent = content.replace(
  /\/images\/fashion\//g,
  `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`
);

// Tulis file baru
fs.writeFileSync(filePath, newContent, 'utf8');

// Verifikasi
const oldCount = (content.match(/\/images\/fashion\//g) || []).length;
const newCount = (newContent.match(/supabase\.co\/storage/g) || []).length;

console.log(`\n✅ CONVERSION COMPLETE`);
console.log(`📊 Images converted: ${oldCount} → ${newCount}`);

// Tampilkan contoh
console.log('\n🔗 Example conversions:');
const lines = newContent.split('\n').filter(line => line.includes('supabase.co'));
lines.slice(0, 3).forEach(line => {
  console.log(line.trim());
});