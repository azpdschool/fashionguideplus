// scripts/migrate-all.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 MIGRATE ALL FILES TO SUPABASE URLS\n');

const SUPABASE_URL = 'https://iabqihvrkrhkawctlthj.supabase.co';
const BUCKET_NAME = 'fashion';

// File yang perlu diupdate
const FILES_TO_UPDATE = [
  'src/data/categories.js',
  'src/data/styles.js', 
  'src/data/dictionary.js',
  'api/data/fashion/dictionary.js',
  'api/data/fashion/styles.js'
];

function migrateFile(filePath) {
  console.log(`📄 Processing: ${path.basename(filePath)}`);
  
  try {
    // Baca file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Hitung image lokal
    const localImages = (content.match(/\/images\/fashion\//g) || []).length;
    
    if (localImages === 0) {
      console.log(`   ℹ️  No local images found (maybe already converted?)`);
      return 0;
    }
    
    console.log(`   Found ${localImages} local image(s)`);
    
    // Backup
    fs.writeFileSync(`${filePath}.backup`, content, 'utf8');
    console.log(`   💾 Backup created`);
    
    // Replace semua image paths
    let newContent = content;
    const regex = /"\/images\/fashion\/([^"]+)"/g;
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      const oldUrl = match[0];
      const newUrl = `"${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${match[1]}"`;
      newContent = newContent.replace(new RegExp(oldUrl, 'g'), newUrl);
    }
    
    // Tulis file baru
    fs.writeFileSync(filePath, newContent, 'utf8');
    
    // Hitung hasil
    const supabaseUrls = (newContent.match(/supabase\.co\/storage/g) || []).length;
    console.log(`   ✅ Converted: ${supabaseUrls} image(s)`);
    
    // Contoh
    const firstMatch = content.match(/"\/images\/fashion\/([^"]+)"/);
    if (firstMatch) {
      console.log(`   Example: "${firstMatch[1]}"`);
      console.log(`            → ${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${firstMatch[1]}`);
    }
    
    return localImages;
    
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return 0;
  }
}

async function main() {
  console.log('🔍 Checking files...\n');
  
  let totalConverted = 0;
  let processed = 0;
  
  for (const filePath of FILES_TO_UPDATE) {
    if (fs.existsSync(filePath)) {
      processed++;
      const converted = migrateFile(filePath);
      totalConverted += converted;
      console.log('');
    } else {
      console.log(`⚠️  File not found: ${filePath}\n`);
    }
  }
  
  console.log('✅ MIGRATION COMPLETE!');
  console.log(`📊 Processed ${processed} files, converted ${totalConverted} images`);
  
  console.log('\n📝 Verification:');
  console.log('Run: npm run check-structure');
  console.log('Then start your app: npm run dev');
}

// Jalankan
main().catch(console.error);