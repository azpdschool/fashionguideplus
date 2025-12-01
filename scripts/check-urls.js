require('dotenv').config();
const fs = require('fs');
const https = require('https');

console.log('🔍 CHECKING SUPABASE IMAGE URLs...\n');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;

function checkImage(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 5000 }, (res) => {
      resolve({
        url,
        status: res.statusCode,
        ok: res.statusCode === 200
      });
    });
    
    req.on('error', () => {
      resolve({ url, status: 'ERROR', ok: false });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({ url, status: 'TIMEOUT', ok: false });
    });
  });
}

async function main() {
  // Cek file bodyTypes.js sebagai sample
  const filePath = 'api/data/fashion/bodyTypes.js';
  
  if (!fs.existsSync(filePath)) {
    console.log('❌ File not found:', filePath);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Cari semua URL Supabase
  const urlRegex = /https:\/\/[^"]+\.(png|jpg|jpeg|gif|svg)/g;
  const urls = [...new Set(content.match(urlRegex) || [])];
  
  console.log(`📊 Found ${urls.length} unique Supabase URLs`);
  
  if (urls.length === 0) {
    console.log('⚠️  No Supabase URLs found. Did you run npm run migrate?');
    return;
  }
  
  console.log('\n🔗 Checking first 5 URLs...\n');
  
  // Cek hanya 5 URL pertama
  const sampleUrls = urls.slice(0, 5);
  
  for (const url of sampleUrls) {
    const result = await checkImage(url);
    const filename = url.split('/').pop();
    const statusIcon = result.ok ? '✅' : '❌';
    
    console.log(`${statusIcon} ${filename}`);
    console.log(`   ${url}`);
    console.log(`   Status: ${result.status}\n`);
  }
  
  // Summary
  const allChecks = await Promise.all(sampleUrls.map(checkImage));
  const working = allChecks.filter(r => r.ok).length;
  
  console.log(`📈 SUMMARY: ${working}/${sampleUrls.length} URLs working`);
  
  if (working === sampleUrls.length) {
    console.log('🎉 ALL IMAGES ARE ACCESSIBLE!');
  } else {
    console.log('⚠️  Some images might not be uploaded to Supabase yet.');
    console.log('   Run: npm run upload-images (if you have that script)');
  }
}

main().catch(console.error);