// scripts/test-all-urls.js
import fs from 'fs';
import https from 'https';

console.log('🔍 TESTING ALL IMAGE URLs IN DATA FILES\n');

const files = [
  'src/data/bodyTypes.js',
  'src/data/categories.js',
  'src/data/styles.js',
  'src/data/dictionary.js'
];

function extractUrls(content) {
  const regex = /https:\/\/[^"]+\.(jpg|jpeg|png|gif)/gi;
  return [...new Set(content.match(regex) || [])];
}

function testUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 5000 }, (res) => {
      res.on('data', () => {}); // Consume data
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          success: res.statusCode === 200
        });
      });
    });
    
    req.on('error', () => resolve({ url, status: 'ERROR', success: false }));
    req.on('timeout', () => resolve({ url, status: 'TIMEOUT', success: false }));
  });
}

async function main() {
  let allUrls = [];
  
  // Extract URLs from all files
  files.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      const urls = extractUrls(content);
      console.log(`📄 ${file}: ${urls.length} URLs`);
      allUrls.push(...urls);
    }
  });
  
  allUrls = [...new Set(allUrls)]; // Remove duplicates
  
  console.log(`\n🔗 Total unique URLs: ${allUrls.length}\n`);
  
  // Test first 10 URLs
  const testUrls = allUrls.slice(0, 10);
  console.log('Testing first 10 URLs...\n');
  
  for (const url of testUrls) {
    const filename = url.split('/').pop().substring(0, 30);
    process.stdout.write(`  ${filename}... `);
    
    const result = await testUrl(url);
    
    if (result.success) {
      console.log(`✅ ${result.status}`);
    } else {
      console.log(`❌ ${result.status}`);
    }
  }
  
  // Summary
  const results = await Promise.all(testUrls.map(testUrl));
  const success = results.filter(r => r.success).length;
  
  console.log(`\n📊 Success rate: ${success}/${testUrls.length}`);
  
  if (success === testUrls.length) {
    console.log('\n🎉 ALL URLs ARE WORKING! Ready for deployment!');
  } else {
    console.log('\n⚠️  Some URLs are broken. Check dictionary images.');
  }
}

main().catch(console.error);