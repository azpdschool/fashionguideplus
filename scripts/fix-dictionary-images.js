// scripts/fix-dictionary-images.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 FIXING DICTIONARY IMAGES - USING EXISTING IMAGES\n');

const SUPABASE_URL = 'https://iabqihvrkrhkawctlthj.supabase.co';
const BUCKET = 'fashion';

const filePath = 'src/data/dictionary.js';

if (!fs.existsSync(filePath)) {
  console.log('❌ File not found:', filePath);
  process.exit(1);
}

console.log(`📄 Reading: ${filePath}`);

let content = fs.readFileSync(filePath, 'utf8');

// Backup
fs.writeFileSync(`${filePath}.backup-dict`, content, 'utf8');
console.log('💾 Backup created');

// Ganti semua gambar dictionary dengan gambar apple.jpg dari body-types
const newContent = content.replace(
  /https:\/\/iabqihvrkrhkawctlthj\.supabase\.co\/storage\/v1\/object\/public\/fashion\/[^"]+\.(png|jpg|jpeg|gif)/g,
  `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/body-types/apple.jpg`
);

// Tulis file baru
fs.writeFileSync(filePath, newContent, 'utf8');

console.log(`✅ All dictionary images replaced with apple.jpg`);
console.log(`\n🔗 Example: ${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/body-types/apple.jpg`);

// Hitung berapa yang diubah
const oldUrls = (content.match(/supabase\.co\/storage/g) || []).length;
const newUrls = (newContent.match(/supabase\.co\/storage/g) || []).length;

console.log(`\n📊 URLs before: ${oldUrls}, after: ${newUrls}`);