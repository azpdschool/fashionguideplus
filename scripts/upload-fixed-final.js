// scripts/upload-fixed-final.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 UPLOAD FINAL - DENGAN SERVICE ROLE KEY\n');

// Load .env
const envPath = path.join(__dirname, '..', '.env');
let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
} else {
  console.error('❌ .env file not found');
  process.exit(1);
}

// Parse .env
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const [, key, value] = match;
    envVars[key.trim()] = value.trim();
  }
});

// Gunakan SERVICE ROLE KEY untuk akses penuh
const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseKey = envVars.SUPABASE_SERVICE_ROLE_KEY; // INI YANG PENTING!

if (!supabaseKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in .env');
  console.error('Make sure you have this in your .env:');
  console.error('SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...');
  process.exit(1);
}

console.log(`🔗 Supabase URL: ${supabaseUrl}`);
console.log(`🔑 Using Service Role Key (full access)\n`);

const supabase = createClient(supabaseUrl, supabaseKey);

// Structure folders
const folders = [
  { 
    local: 'public/images/fashion/body-types', 
    remote: 'body-types',
    expectedFiles: ['apple.jpg', 'hourglass.jpg', 'invertedtriangle.jpg', 'pear.jpg', 'rectangle.jpg']
  },
  { 
    local: 'public/images/fashion/categories', 
    remote: 'categories',
    expectedFiles: ['dresses.jpg']
  },
  { 
    local: 'public/images/fashion/styles', 
    remote: 'styles',
    expectedFiles: ['argyle.jpg', 'cashmere.jpg', 'cityelegance.jpg', 'houndstooth.jpg', 
                   'pinstripe.jpg', 'silk.jpg', 'tweed.jpg', 'wool.jpg']
  }
];

async function createBucketIfNotExists() {
  console.log('🔍 Checking bucket...');
  
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('❌ Cannot list buckets:', error.message);
      return false;
    }
    
    const bucketExists = buckets.some(b => b.name === 'fashion');
    
    if (!bucketExists) {
      console.log('Creating bucket: fashion');
      const { error: createError } = await supabase.storage.createBucket('fashion', {
        public: true,
        fileSizeLimit: 52428800, // 50MB
        allowedMimeTypes: ['image/*']
      });
      
      if (createError) {
        console.error('❌ Failed to create bucket:', createError.message);
        return false;
      }
      console.log('✅ Bucket created successfully');
    } else {
      console.log('✅ Bucket already exists');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    return false;
  }
}

async function uploadFile(localPath, remotePath) {
  try {
    const fileBuffer = fs.readFileSync(localPath);
    const fileName = path.basename(localPath);
    
    console.log(`   📤 ${fileName}`);
    
    const { error } = await supabase.storage
      .from('fashion')
      .upload(remotePath, fileBuffer, {
        upsert: true,
        contentType: 'image/jpeg',
        cacheControl: '3600'
      });
    
    if (error) {
      if (error.message.includes('already exists')) {
        console.log(`   ⚠️  Already exists (replacing)`);
        return true;
      }
      throw error;
    }
    
    console.log(`   ✅ Uploaded`);
    return true;
    
  } catch (error) {
    console.log(`   ❌ Failed: ${error.message}`);
    return false;
  }
}

async function uploadFolder(folder) {
  console.log(`\n📁 Folder: ${folder.local}`);
  
  if (!fs.existsSync(folder.local)) {
    console.log(`   ⚠️  Folder not found`);
    return 0;
  }
  
  // List all files in directory
  const files = fs.readdirSync(folder.local)
    .filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
  
  console.log(`   Found ${files.length} image(s)`);
  
  // Check if files match expected
  const missingFiles = folder.expectedFiles.filter(f => !files.includes(f));
  if (missingFiles.length > 0) {
    console.log(`   ⚠️  Missing expected files: ${missingFiles.join(', ')}`);
  }
  
  let success = 0;
  for (const file of files) {
    const localPath = path.join(folder.local, file);
    const remotePath = `${folder.remote}/${file}`;
    
    const uploaded = await uploadFile(localPath, remotePath);
    if (uploaded) success++;
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return success;
}

async function main() {
  console.log('🚀 Starting final upload process...\n');
  
  // Step 1: Create bucket
  const bucketReady = await createBucketIfNotExists();
  if (!bucketReady) {
    console.error('\n❌ Cannot proceed without bucket');
    return;
  }
  
  // Step 2: Upload all folders
  let totalUploaded = 0;
  let totalFiles = 0;
  
  for (const folder of folders) {
    const filesInFolder = fs.existsSync(folder.local) 
      ? fs.readdirSync(folder.local).filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f)).length
      : 0;
    
    totalFiles += filesInFolder;
    
    const uploaded = await uploadFolder(folder);
    totalUploaded += uploaded;
  }
  
  console.log('\n📊 UPLOAD SUMMARY:');
  console.log(`   Files found: ${totalFiles}`);
  console.log(`   Uploaded: ${totalUploaded}`);
  
  if (totalUploaded === totalFiles) {
    console.log('\n🎉 SUCCESS! All images uploaded to Supabase!');
  } else {
    console.log(`\n⚠️  Partial success: ${totalUploaded}/${totalFiles} files uploaded`);
  }
  
  // Step 3: Test URLs
  console.log('\n🔗 TEST URLS (open in browser):');
  console.log(`1. ${supabaseUrl}/storage/v1/object/public/fashion/body-types/apple.jpg`);
  console.log(`2. ${supabaseUrl}/storage/v1/object/public/fashion/categories/dresses.jpg`);
  console.log(`3. ${supabaseUrl}/storage/v1/object/public/fashion/styles/argyle.jpg`);
  
  console.log('\n📝 NEXT STEPS:');
  console.log('1. Open test URLs in browser to verify');
  console.log('2. Run: npm run dev (to test your app)');
  console.log('3. Deploy to Vercel: vercel --prod');
  
  // Check current bucket contents
  console.log('\n🔍 Checking bucket contents...');
  try {
    const { data: files, error } = await supabase.storage
      .from('fashion')
      .list();
    
    if (!error && files) {
      console.log(`Bucket has ${files.length} item(s)`);
      files.slice(0, 5).forEach(file => {
        console.log(`   - ${file.name}`);
      });
      if (files.length > 5) console.log(`   ... and ${files.length - 5} more`);
    }
  } catch (error) {
    console.log('   Could not list bucket contents');
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});