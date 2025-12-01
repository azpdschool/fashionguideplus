// scripts/final-check.js
import fs from 'fs';

console.log('🔍 FINAL CHECK - ALL IMAGE URLs\n');

const files = [
  'src/data/bodyTypes.js',
  'src/data/categories.js', 
  'src/data/styles.js',
  'src/data/dictionary.js'
];

function checkFile(filePath) {
  console.log(`\n📄 ${filePath.split('/').pop()}:`);
  
  if (!fs.existsSync(filePath)) {
    console.log('   ❌ File not found');
    return { total: 0, local: 0, supabase: 0 };
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const totalImages = (content.match(/image:/g) || []).length;
  const localImages = (content.match(/\/images\/fashion\//g) || []).length;
  const supabaseImages = (content.match(/supabase\.co\/storage/g) || []).length;
  
  console.log(`   Total image references: ${totalImages}`);
  console.log(`   Local paths: ${localImages}`);
  console.log(`   Supabase URLs: ${supabaseImages}`);
  
  if (localImages > 0) {
    console.log('   ⚠️  WARNING: Still has local paths!');
  }
  
  if (supabaseImages > 0) {
    console.log('   ✅ Has Supabase URLs');
  }
  
  return { total: totalImages, local: localImages, supabase: supabaseImages };
}

async function main() {
  console.log('🚀 Checking all data files...\n');
  
  let totals = { total: 0, local: 0, supabase: 0 };
  
  files.forEach(file => {
    const stats = checkFile(file);
    totals.total += stats.total;
    totals.local += stats.local;
    totals.supabase += stats.supabase;
  });
  
  console.log('\n📊 SUMMARY:');
  console.log(`Total images: ${totals.total}`);
  console.log(`Local paths: ${totals.local} (should be 0)`);
  console.log(`Supabase URLs: ${totals.supabase}`);
  
  if (totals.local === 0) {
    console.log('\n🎉 SUCCESS! All images converted to Supabase URLs!');
    console.log('\n📝 Next steps:');
    console.log('1. Upload images to Supabase Storage');
    console.log('2. Test URLs in browser');
    console.log('3. Deploy to Vercel!');
  } else {
    console.log('\n⚠️  WARNING: Some local paths remain');
    console.log('Run: npm run fix-styles and npm run fix-categories if needed');
  }
}

main();