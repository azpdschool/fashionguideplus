// check-missing-images.js
import fs from 'fs';
import path from 'path';

console.log('🔍 Checking for missing images...');

const requiredImages = {
  'body-types': [
    'apple.jpg', 'hourglass.jpg', 'invertedtriangle.jpg', 'pear.jpg', 'rectangle.jpg',
    'longcardigan.png', 'openblazer.png', 'beltedcoats.png', 'fittedblazers.png',
    'structuredcoat.png', 'peplumblazer.png', 'croppedjacket.png', 'trenchcoat.png'
  ],
  'dictionary': [
    'a-line.png', 'ankleboots.png', 'applique.png', 'balletflats.png', 'biascut.png',
    'blazer.png', 'boning.png', 'capsleeve.png', 'crewneck.png', 'corset.png',
    'cropped.png', 'culottes.png', 'dart.png', 'doublebreasted.png', 'dropshoulder.png',
    'epaulettes.png', 'frenchseam.png', 'halterneck.png', 'highwaisted.png', 'hemline.png',
    'lapel.png', 'layering.png', 'mermaid.png', 'midi.png', 'monochrome.png',
    'oversized.png', 'palazzo.png', 'princess.png', 'pleats.png', 'raglan.png',
    'ruched.png', 'shiftdress.png', 'smocking.png', 'turtleneck.png', 'vent.png', 'yoke.png'
  ],
  'styles': [
    'linenshirt.png', 'blouse.png', 'straightjeans.png', 'maxidress.png', 'tshirt.png',
    'ivory.jpg', 'camel.jpg', 'navy.jpg', 'forest.jpg', 'wool.jpg', 'cashmere.jpg',
    'tweed.jpg', 'silk.jpg', 'pinstripe.jpg', 'houndstooth.jpg', 'argyle.jpg',
    'cityelegance.jpg', 'gardenparty.jpg', 'casualrefinement.jpg'
  ]
};

Object.entries(requiredImages).forEach(([folder, files]) => {
  const folderPath = `./src/data/images/${folder}`;
  console.log(`\n📁 ${folder}:`);
  
  if (!fs.existsSync(folderPath)) {
    console.log(`   ❌ Folder tidak ada: ${folderPath}`);
    return;
  }
  
  const existingFiles = fs.readdirSync(folderPath);
  
  files.forEach(file => {
    if (existingFiles.includes(file)) {
      console.log(`   ✅ ${file}`);
    } else {
      console.log(`   ❌ MISSING: ${file}`);
    }
  });
});