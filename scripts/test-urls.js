// scripts/test-urls.js
import fs from 'fs';
import https from 'https';

console.log('🔍 TESTING SUPABASE IMAGE URLs\n');

const SUPABASE_URL = 'https://iabqihvrkrhkawctlthj.supabase.co';
const BUCKET = 'fashion';

// Sample URLs to test based on your data files
const testUrls = [
  // Body Types
  `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/body-types/apple.jpg`,
  `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/body-types/hourglass.jpg`,
  `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/body-types/invertedtriangle.jpg`,
  
  // Categories
  `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/categories/dresses.jpg`,
  
  // Styles
  `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/styles/argyle.jpg`,
  `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/styles/cashmere.jpg`,
  
  // Dictionary images (png format based on your data)
  `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/a-line.png`,
  `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/ankleboots.png`
];

function testUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          success: res.statusCode === 200,
          size: res.headers['content-length'] || 'unknown'
        });
      });
    });
    
    req.on('error', (error) => {
      resolve({
        url,
        status: 'ERROR',
        success: false,
        error: error.message
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        success: false,
        error: 'Request timeout'
      });
    });
  });
}

async function main() {
  console.log(`Testing ${testUrls.length} URLs...\n`);
  
  const results = [];
  
  for (const url of testUrls) {
    process.stdout.write(`Testing: ${url.split('/').pop()}... `);
    const result = await testUrl(url);
    results.push(result);
    
    if (result.success) {
      console.log(`✅ 200 (${result.size} bytes)`);
    } else {
      console.log(`❌ ${result.status}`);
    }
  }
  
  console.log('\n📊 RESULTS:');
  const successful = results.filter(r => r.success).length;
  console.log(`✅ Successful: ${successful}/${results.length}`);
  
  if (successful < results.length) {
    console.log('\n❌ Failed URLs:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   ${r.url.split('/').pop()}: ${r.status} ${r.error || ''}`);
    });
    
    console.log('\n⚠️  Some images are missing from Supabase Storage');
    console.log('Run: npm run upload-final');
  } else {
    console.log('\n🎉 All test URLs are working!');
    console.log('\n🚀 Your app should now load images correctly.');
  }
}

main().catch(console.error);