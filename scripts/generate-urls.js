require('dotenv').config();
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const BUCKET_NAME = 'fashion';

function generateSupabaseUrl(localPath) {
  if (!localPath || !localPath.includes('/images/fashion/')) {
    return localPath;
  }
  
  // Contoh: /images/fashion/body-types/apple.png
  // -> fashion/body-types/apple.png
  const relativePath = localPath.replace('/images/fashion/', '');
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${relativePath}`;
}

function updateImageUrlsInObject(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  for (const key in obj) {
    if (key === 'image' || key === 'icon') {
      if (typeof obj[key] === 'string') {
        obj[key] = generateSupabaseUrl(obj[key]);
      }
    } else if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map(item => {
        if (typeof item === 'object') {
          return updateImageUrlsInObject(item);
        }
        if (typeof item === 'string' && item.includes('/images/fashion/')) {
          return generateSupabaseUrl(item);
        }
        return item;
      });
    } else if (typeof obj[key] === 'object') {
      obj[key] = updateImageUrlsInObject(obj[key]);
    }
  }
  
  return obj;
}

function processDataFile(filePath) {
  console.log(`🔧 Processing: ${filePath}`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Eksport pattern: export const variableName = [...]
  const exportMatch = content.match(/export const (\w+) = (\[.*\]|\{.*\})/s);
  
  if (exportMatch) {
    const [, variableName, dataStr] = exportMatch;
    
    try {
      // Parse JSON-like object
      const data = eval(`(${dataStr})`);
      const updatedData = updateImageUrlsInObject(data);
      
      // Generate new content dengan URL Supabase
      const newContent = `export const ${variableName} = ${JSON.stringify(updatedData, null, 2)};\n`;
      
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      
    } catch (error) {
      console.log(`❌ Error parsing ${filePath}:`, error.message);
    }
  }
}

function main() {
  const filesToProcess = [
    './src/data/bodyTypes.js',
    './src/data/categories.js',
    './src/data/styles.js',
    './api/data/fashion/bodyTypes.js'
  ];
  
  console.log('🔄 Generating Supabase URLs...\n');
  
  filesToProcess.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      processDataFile(filePath);
    }
  });
  
  console.log('\n✅ All files updated with Supabase URLs!');
  console.log('\n📝 Tips:');
  console.log('1. Jalankan: npm run upload-images (untuk upload gambar)');
  console.log('2. Jalankan: npm run generate-urls (untuk update URL di data)');
  console.log('3. Deploy ke Vercel! 🚀');
}

main();