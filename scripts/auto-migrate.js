require('dotenv').config();
const fs = require('fs');
const path = require('path');

console.log('🚀 STARTING AUTO MIGRATION...\n');

// Ambil URL dari .env kamu
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://iabqihvrkrhkawctlthj.supabase.co';
const BUCKET_NAME = 'fashion';

console.log(`🔗 Using Supabase URL: ${SUPABASE_URL}`);
console.log(`📦 Bucket: ${BUCKET_NAME}\n`);

// Fungsi convert path lokal ke URL Supabase
function convertPath(localPath) {
  if (!localPath || typeof localPath !== 'string') return localPath;
  
  // Skip jika sudah URL Supabase
  if (localPath.includes('supabase.co')) return localPath;
  
  // Hanya proses path yang diawali dengan /images/fashion/
  if (localPath.startsWith('/images/fashion/')) {
    // Hapus '/images/fashion/' dari awal path
    const relativePath = localPath.replace('/images/fashion/', '');
    // Buat URL Supabase
    return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${relativePath}`;
  }
  
  return localPath;
}

// Fungsi untuk convert semua image dalam object
function convertObject(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  // Loop semua property
  for (const key in obj) {
    if (key === 'image' || key === 'icon' || key === 'src') {
      // Convert single image
      obj[key] = convertPath(obj[key]);
    } else if (Array.isArray(obj[key])) {
      // Convert array (items, tops, bottoms, etc.)
      obj[key] = obj[key].map(item => {
        if (typeof item === 'string' && item.includes('/images/fashion/')) {
          return convertPath(item);
        } else if (typeof item === 'object') {
          return convertObject(item);
        }
        return item;
      });
    } else if (typeof obj[key] === 'object') {
      // Convert nested object
      obj[key] = convertObject(obj[key]);
    }
  }
  
  return obj;
}

// Proses satu file
function processFile(filePath) {
  console.log(`📄 Processing: ${filePath}`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Cari export const variableName = 
    const exportMatch = content.match(/export const (\w+) = (\[.*?\]|\{.*?\});/s);
    
    if (exportMatch) {
      const [, varName, dataStr] = exportMatch;
      
      // Parse data dengan eval (hati-hati, hanya untuk data kamu sendiri)
      const data = eval(`(${dataStr})`);
      
      // Convert semua image paths
      const convertedData = Array.isArray(data) 
        ? data.map(item => convertObject(item))
        : convertObject(data);
      
      // Format ulang dengan JSON.stringify yang rapi
      const newContent = `export const ${varName} = ${JSON.stringify(convertedData, null, 2)};\n`;
      
      // Backup file asli
      const backupPath = filePath + '.backup';
      fs.copyFileSync(filePath, backupPath);
      console.log(`   💾 Backup created: ${backupPath}`);
      
      // Write file baru
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`   ✅ Converted ${varName}`);
      
      // Hitung berapa image yang diubah
      const oldImages = content.match(/\/images\/fashion\//g) || [];
      const newImages = newContent.match(/supabase\.co\/storage/g) || [];
      console.log(`   📸 Images converted: ${oldImages.length} → ${newImages.length}`);
      
    } else {
      console.log(`   ⚠️  No export found in file`);
    }
    
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
}

// MAIN FUNCTION
function main() {
  console.log('🔍 Looking for files to convert...\n');
  
  // List semua file yang perlu di-convert
  const files = [
    // Files di api/data/fashion/
    'api/data/fashion/bodyTypes.js',
    'api/data/fashion/categories.js',
    'api/data/fashion/styles.js',
    
    // Files di src/data/ (jika ada)
    'src/data/categories.js',
    'src/data/bodyTypes.js',
    'src/data/styles.js',
    'src/data/dictionary.js'
  ].filter(file => fs.existsSync(file));
  
  if (files.length === 0) {
    console.log('❌ No files found! Check your project structure.');
    return;
  }
  
  console.log(`📁 Found ${files.length} file(s):`);
  files.forEach(file => console.log(`   - ${file}`));
  
  console.log('\n🎬 Starting conversion...\n');
  
  // Proses semua file
  files.forEach(file => {
    processFile(file);
    console.log('');
  });
  
  console.log('✅ AUTO MIGRATION COMPLETE!');
  console.log('\n📝 NEXT STEPS:');
  console.log('1. Check the converted files');
  console.log('2. Run your app to test if images load');
  console.log('3. If everything works, you can delete the .backup files');
  console.log('\n💡 Tip: Backups were created with .backup extension');
}

// Jalankan
main();