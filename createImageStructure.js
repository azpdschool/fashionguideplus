// createImageStructure.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Daftar file yang diperlukan
const imageStructure = {
  'body-types': [
    'hourglass.png', 'pear.png', 'apple.png', 'rectangle.png', 'inverted-triangle.png'
  ],
  'styles': [
    'old-money.jpg', 'minimalist.jpg', 'streetwear.jpg', 'boho.jpg', 'glam.jpg',
    'athleisure.jpg', 'business-casual.jpg', 'vintage.jpg'
  ],
  'dictionary': [
    'blazer.jpg', 'trench-coat.jpg', 'little-black-dress.jpg', 'white-t-shirt.jpg',
    'denim-jeans.jpg', 'leather-jacket.jpg', 'evening-gown.jpg', 'cocktail-dress.jpg'
  ],
  'categories': [
    'dresses.jpg', 'tops.jpg', 'bottoms.jpg', 'outerwear.jpg'
  ]
};

function createFolderStructure() {
  const basePath = path.join(__dirname, 'public', 'images', 'fashion');
  
  // Buat folder utama
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
    console.log('📁 Created base folder:', basePath);
  }

  // Buat setiap subfolder
  for (const [folder, files] of Object.entries(imageStructure)) {
    const folderPath = path.join(basePath, folder);
    
    // Buat folder
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log('📁 Created folder:', folder);
    }

    // Buat file README dengan daftar gambar yang diperlukan
    const readmeContent = `# Gambar yang diperlukan untuk ${folder}\n\n${files.map(file => `- ${file}`).join('\n')}`;
    fs.writeFileSync(path.join(folderPath, 'README.md'), readmeContent);

    console.log(`✅ Created ${folder} with ${files.length} image references`);
  }

  console.log('\n🎉 Folder structure created!');
  console.log('📝 Now you can add your actual images to these folders');
  console.log('📍 Location: public/images/fashion/');
}

createFolderStructure();