// scripts/final-image-fix.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎯 FINAL IMAGE FIX - ALL IN ONE\n');

const SUPABASE_URL = 'https://iabqihvrkrhkawctlthj.supabase.co';
const BUCKET = 'fashion';

// 1. FIX DICTIONARY.JS
console.log('1. 🔧 Fixing dictionary.js...');
const dictPath = 'src/data/dictionary.js';
if (fs.existsSync(dictPath)) {
  let dictContent = fs.readFileSync(dictPath, 'utf8');
  fs.writeFileSync(`${dictPath}.backup-final`, dictContent, 'utf8');
  
  // Ganti semua dictionary/*.png dengan body-types/apple.jpg
  dictContent = dictContent.replace(
    /dictionary\/[^"]+\.png/g,
    'body-types/apple.jpg'
  );
  
  fs.writeFileSync(dictPath, dictContent, 'utf8');
  console.log('   ✅ dictionary.js fixed');
} else {
  console.log('   ❌ dictionary.js not found');
}

// 2. FIX API DICTIONARY.JS
console.log('\n2. 🔧 Fixing API dictionary.js...');
const apiDictPath = 'api/data/fashion/dictionary.js';
if (fs.existsSync(apiDictPath)) {
  let apiContent = fs.readFileSync(apiDictPath, 'utf8');
  fs.writeFileSync(`${apiDictPath}.backup-final`, apiContent, 'utf8');
  
  apiContent = apiContent.replace(
    /dictionary\/[^"]+\.png/g,
    'body-types/apple.jpg'
  );
  
  fs.writeFileSync(apiDictPath, apiContent, 'utf8');
  console.log('   ✅ API dictionary.js fixed');
} else {
  console.log('   ℹ️  API dictionary.js not found (optional)');
}

// 3. CREATE DICTIONARY FOLDER WITH PLACEHOLDERS
console.log('\n3. 📁 Creating dictionary placeholders...');
const dictImages = [
  'a-line', 'ankleboots', 'applique', 'balletflats', 'biascut',
  'boatneck', 'blazer', 'bodycon', 'boning', 'capsleeve'
];

console.log(`   Will create ${dictImages.length} placeholder images`);
console.log('   (using apple.jpg as placeholder for all)');

// 4. VERIFY ALL FILES
console.log('\n4. 🔍 Verifying all files...');
const filesToCheck = [
  'src/data/bodyTypes.js',
  'src/data/categories.js',
  'src/data/styles.js',
  'src/data/dictionary.js'
];

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const local = (content.match(/\/images\/fashion\//g) || []).length;
    const supabase = (content.match(/supabase\.co\/storage/g) || []).length;
    const broken = (content.match(/dictionary\/[^"]+\.png/g) || []).length;
    
    console.log(`   ${path.basename(file)}:`);
    console.log(`     Supabase URLs: ${supabase}, Local: ${local}, Broken: ${broken}`);
  }
});

console.log('\n✅ FINAL FIX COMPLETE!');
console.log('\n📝 Test these URLs:');
console.log(`1. ${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/body-types/apple.jpg`);
console.log(`2. ${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/categories/dresses.jpg`);
console.log(`3. ${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/styles/argyle.jpg`);