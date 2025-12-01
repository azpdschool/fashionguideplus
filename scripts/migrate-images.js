// scripts/migrate-simple.js - ES Module Version
import fs from 'fs';
import path from 'path';

console.log('🚀 MIGRATING LOCAL IMAGES TO SUPABASE...\n');

// Konfigurasi Supabase kamu
const SUPABASE_URL = 'https://iabqihvrkrhkawctlthj.supabase.co';
const BUCKET_NAME = 'fashion';

// List file yang perlu diupdate
const filesToUpdate = [
  'src/data/bodyTypes.js',
  'src/data/categories.js',
  'src/data/styles.js',
  'src/data/dictionary.js',
  'api/data/fashion/dictionary.js'
];

function migrateFile(filePath) {
  console.log(`📄 Processing: ${path.basename(filePath)}`);
  
  try {
    // Baca file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Hitung berapa image lokal
    const localImages = (content.match(/\/images\/fashion\//g) || []).length;
    console.log(`   Found ${localImages} local image(s)`);
    
    if (localImages === 0) {
      console.log(`   ℹ️  No changes needed`);
      return 0;
    }
    
    // Buat backup
    fs.writeFileSync(`${filePath}.backup`, content, 'utf8');
    console.log(`   💾 Backup created`);
    
    // Ganti semua /images/fashion/ dengan URL Supabase
    const newContent = content.replace(
      /"\/images\/fashion\/([^"]+)"/g,
      `"${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/$1"`
    );
    
    // Hitung berapa yang berubah
    const supabaseUrls = (newContent.match(/supabase\.co\/storage/g) || []).length;
    
    // Tulis file baru
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`   ✅ Converted: ${supabaseUrls} image(s)`);
    
    // Contoh perubahan
    const firstMatch = content.match(/"\/images\/fashion\/([^"]+)"/);
    if (firstMatch) {
      const oldUrl = firstMatch[0];
      const newUrl = `"${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${firstMatch[1]}"`;
      console.log(`   Example: ${oldUrl}`);
      console.log(`            ↓`);
      console.log(`            ${newUrl}`);
    }
    
    return supabaseUrls;
    
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return 0;
  }
}

async function main() {
  console.log('🔍 Checking files...\n');
  
  let totalConverted = 0;
  let filesProcessed = 0;
  
  for (const filePath of filesToUpdate) {
    if (fs.existsSync(filePath)) {
      filesProcessed++;
      const converted = migrateFile(filePath);
      totalConverted += converted;
      console.log('');
    } else {
      console.log(`⚠️  File not found: ${filePath}\n`);
    }
  }
  
  if (filesProcessed === 0) {
    console.log('❌ No files found! Check your paths.');
    return;
  }
  
  console.log('✅ MIGRATION COMPLETE!');
  console.log(`📊 Processed ${filesProcessed} files, converted ${totalConverted} images`);
  
  console.log('\n🔗 Test one URL:');
  console.log(`${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/body-types/apple.png`);
  
  console.log('\n📝 Next steps:');
  console.log('1. Run your app: npm run dev');
  console.log('2. Check if images load correctly');
  console.log('3. Delete .backup files if everything works');
}

// Jalankan
main().catch(console.error);