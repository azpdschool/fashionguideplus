// check-images.js
import fs from 'fs';
import path from 'path';

console.log('🔍 Checking image structure...');

const basePath = './src/data/images';
const folders = ['body-types', 'categories', 'dictionary', 'styles'];

folders.forEach(folder => {
  const folderPath = path.join(basePath, folder);
  if (fs.existsSync(folderPath)) {
    const files = fs.readdirSync(folderPath);
    console.log(`✅ ${folder}: ${files.length} files`);
    if (files.length > 0) {
      console.log(`   Sample: ${files.slice(0, 3).join(', ')}`);
    }
  } else {
    console.log(`❌ ${folder}: Folder not found`);
  }
});