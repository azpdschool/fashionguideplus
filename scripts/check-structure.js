// scripts/check-structure.js
import fs from 'fs';
import path from 'path';

console.log('📁 PROJECT STRUCTURE CHECK\n');

console.log('✅ Data files in src/data/:');
const srcDataDir = 'src/data';
if (fs.existsSync(srcDataDir)) {
  const files = fs.readdirSync(srcDataDir);
  files.forEach(file => {
    const filePath = path.join(srcDataDir, file);
    const stats = fs.statSync(filePath);
    const size = (stats.size / 1024).toFixed(2);
    console.log(`   📄 ${file} (${size} KB)`);
  });
} else {
  console.log('   ❌ Directory not found');
}

console.log('\n✅ API files in api/data/fashion/:');
const apiDataDir = 'api/data/fashion';
if (fs.existsSync(apiDataDir)) {
  const files = fs.readdirSync(apiDataDir);
  files.forEach(file => {
    const filePath = path.join(apiDataDir, file);
    const stats = fs.statSync(filePath);
    const size = (stats.size / 1024).toFixed(2);
    console.log(`   📄 ${file} (${size} KB)`);
  });
} else {
  console.log('   ❌ Directory not found');
}

console.log('\n✅ Local images in public/images/fashion/:');
const imagesDir = 'public/images/fashion';
if (fs.existsSync(imagesDir)) {
  // Check subdirectories
  const subdirs = fs.readdirSync(imagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  subdirs.forEach(dir => {
    const dirPath = path.join(imagesDir, dir);
    const files = fs.readdirSync(dirPath).filter(f => /\.(png|jpg|jpeg|gif)$/i.test(f));
    console.log(`   📁 ${dir}/ (${files.length} images)`);
  });
} else {
  console.log('   ❌ Directory not found');
}

console.log('\n📊 SUMMARY:');
console.log('Data files should be updated to use Supabase URLs.');
console.log('Run: npm run migrate-simple');