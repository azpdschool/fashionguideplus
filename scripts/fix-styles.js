// scripts/fix-styles.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 FIXING STYLES.JS IMAGES\n');

const SUPABASE_URL = 'https://iabqihvrkrhkawctlthj.supabase.co';
const BUCKET = 'fashion';

const filePath = 'src/data/styles.js';

if (!fs.existsSync(filePath)) {
  console.log('❌ File not found:', filePath);
  process.exit(1);
}

console.log(`📄 Reading: ${filePath}`);

// Baca file
let content = fs.readFileSync(filePath, 'utf8');

// Cek struktur
console.log('First 300 chars:');
console.log(content.substring(0, 300) + '...\n');

// Hitung gambar lokal sebelum
const localBefore = (content.match(/\/images\/fashion\//g) || []).length;
console.log(`Found ${localBefore} local image references`);

if (localBefore === 0) {
  console.log('⚠️  No local images found. Might already be converted?');
  
  // Cek apakah sudah ada URL Supabase
  const supabaseUrls = (content.match(/supabase\.co\/storage/g) || []).length;
  console.log(`Found ${supabaseUrls} Supabase URLs`);
  
  process.exit(0);
}

// Backup
fs.writeFileSync(`${filePath}.backup-final`, content, 'utf8');
console.log('💾 Backup created');

// SIMPLE FIX: Ganti semua /images/fashion/ dengan URL Supabase
const newContent = content.replace(
  /\/images\/fashion\//g,
  `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`
);

// Tulis file baru
fs.writeFileSync(filePath, newContent, 'utf8');

// Hitung hasil
const localAfter = (newContent.match(/\/images\/fashion\//g) || []).length;
const supabaseAfter = (newContent.match(/supabase\.co\/storage/g) || []).length;

console.log(`\n✅ CONVERSION COMPLETE`);
console.log(`📊 Local images: ${localBefore} → ${localAfter}`);
console.log(`📊 Supabase URLs: ${supabaseAfter}`);

// Tampilkan contoh
console.log('\n🔗 Example conversions:');
const lines = newContent.split('\n').filter(line => line.includes('supabase.co'));
if (lines.length > 0) {
  lines.slice(0, 3).forEach(line => {
    const trimmed = line.trim().substring(0, 80);
    console.log(trimmed + '...');
  });
}

console.log('\n📝 Next: Upload images to Supabase Storage');