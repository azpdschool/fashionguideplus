// scripts/quick-fix.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('⚡ QUICK FIX - Convert images to Supabase URLs\n');

// Target file utama
const targetFile = 'src/data/bodyTypes.js';
const supabaseUrl = 'https://iabqihvrkrhkawctlthj.supabase.co';
const bucket = 'fashion';

if (!fs.existsSync(targetFile)) {
  console.log(`❌ File not found: ${targetFile}`);
  console.log('\nLooking for other data files...');
  
  // Cari file lain
  const possibleFiles = [
    'src/data/bodyTypes.js',
    'src/data/categories.js',
    'src/data/styles.js',
    'src/data/dictionary.js'
  ];
  
  const found = possibleFiles.filter(f => fs.existsSync(f));
  console.log(`Found: ${found.join(', ')}`);
  process.exit(1);
}

console.log(`Converting: ${targetFile}`);

// Baca file
const content = fs.readFileSync(targetFile, 'utf8');

// Cari semua image paths
const imagePaths = content.match(/\/images\/fashion\/[^"')]+/g) || [];
console.log(`Found ${imagePaths.length} image paths`);

if (imagePaths.length === 0) {
  console.log('No local images found. File might already be converted.');
  process.exit(0);
}

// Tampilkan contoh sebelum dan sesudah
console.log('\n🔗 EXAMPLE CONVERSIONS:');
imagePaths.slice(0, 3).forEach(imgPath => {
  const oldUrl = `"${imgPath}"`;
  const newUrl = `"${supabaseUrl}/storage/v1/object/public/${bucket}/${imgPath.replace('/images/fashion/', '')}"`;
  console.log(`${oldUrl}`);
  console.log(`↓`);
  console.log(`${newUrl}\n`);
});

// Konfirmasi
console.log('Ready to convert? This will update the file.');
console.log('Type "YES" to continue:');

// Untuk interaktif, kita buat simple prompt
import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('> ', (answer) => {
  if (answer.toUpperCase() === 'YES') {
    // Lakukan conversion
    let newContent = content;
    imagePaths.forEach(imgPath => {
      const oldPattern = `"${imgPath}"`;
      const newUrl = `"${supabaseUrl}/storage/v1/object/public/${bucket}/${imgPath.replace('/images/fashion/', '')}"`;
      newContent = newContent.replace(new RegExp(oldPattern, 'g'), newUrl);
    });
    
    // Buat backup
    fs.writeFileSync(`${targetFile}.backup`, content, 'utf8');
    
    // Write file baru
    fs.writeFileSync(targetFile, newContent, 'utf8');
    
    console.log(`\n✅ ${targetFile} updated!`);
    console.log(`📝 Backup saved as ${targetFile}.backup`);
  } else {
    console.log('❌ Cancelled. No changes made.');
  }
  
  rl.close();
});