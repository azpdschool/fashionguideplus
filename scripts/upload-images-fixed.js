// scripts/upload-images-fixed.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📤 UPLOAD IMAGES TO SUPABASE (FIXED)\n');

// Load .env manually karena kita tidak pakai dotenv/config
const envPath = path.join(__dirname, '..', '.env');
let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  console.log('✅ .env file found');
} else {
  console.log('❌ .env file not found');
  process.exit(1);
}

// Parse .env sederhana
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const [, key, value] = match;
    envVars[key.trim()] = value.trim();
  }
});

// Get Supabase credentials
const supabaseUrl = envVars.VITE_SUPABASE_URL || 'https://iabqihvrkrhkawctlthj.supabase.co';
const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY; // INI YANG BENAR!

if (!supabaseKey) {
  console.error('❌ ERROR: VITE_SUPABASE_ANON_KEY not found in .env');
  console.error('Your .env should have: VITE_SUPABASE_ANON_KEY=eyJhbGci...');
  process.exit(1);
}

console.log(`🔗 Supabase URL: ${supabaseUrl}`);
console.log(`🔑 Key found: ${supabaseKey.substring(0, 20)}...`);
console.log(`📦 Target bucket: fashion\n`);

// Create client
const supabase = createClient(supabaseUrl, supabaseKey);

// Folder structure
const folders = [
  { local: './public/images/fashion/body-types', remote: 'body-types' },
  { local: './public/images/fashion/categories', remote: 'categories' },
  { local: './public/images/fashion/styles', remote: 'styles' }
  // dictionary folder kosong, skip dulu
];

async function uploadFile(localPath, remotePath) {
  try {
    const fileBuffer = fs.readFileSync(localPath);
    const fileName = path.basename(localPath);
    const fullRemotePath = `${remotePath}/${fileName}`;
    
    console.log(`   📤 ${fileName} → ${remotePath}/`);
    
    const { error } = await supabase.storage
      .from('fashion')
      .upload(fullRemotePath, fileBuffer, {
        upsert: true,
        contentType: 'image/png'
      });
    
    if (error) {
      if (error.message.includes('already exists')) {
        console.log(`   ⚠️  Already exists, skipping`);
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

async function uploadFolder(localFolder, remoteFolder) {
  console.log(`\n📁 Folder: ${path.basename(localFolder)}/`);
  
  if (!fs.existsSync(localFolder)) {
    console.log(`   ⚠️  Folder not found`);
    return;
  }
  
  const files = fs.readdirSync(localFolder)
    .filter(f => /\.(png|jpg|jpeg|gif)$/i.test(f));
  
  if (files.length === 0) {
    console.log(`   ℹ️  No images found`);
    return;
  }
  
  console.log(`   Found ${files.length} image(s)`);
  
  let success = 0;
  for (const file of files) {
    const localPath = path.join(localFolder, file);
    const uploaded = await uploadFile(localPath, remoteFolder);
    if (uploaded) success++;
  }
  
  console.log(`   📊 Result: ${success}/${files.length} uploaded`);
}

async function main() {
  console.log('🚀 Starting upload...\n');
  
  // Check bucket
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  
  if (bucketError) {
    console.error('❌ Cannot connect to Supabase:', bucketError.message);
    console.error('\nPossible issues:');
    console.error('1. Invalid Supabase URL or key');
    console.error('2. Network connectivity');
    console.error('3. Key permissions (need storage access)');
    process.exit(1);
  }
  
  console.log('✅ Connected to Supabase Storage');
  
  // Check if bucket exists
  const bucketExists = buckets.some(b => b.name === 'fashion');
  
  if (!bucketExists) {
    console.log('Creating bucket: fashion');
    const { error } = await supabase.storage.createBucket('fashion', {
      public: true
    });
    
    if (error) {
      console.error('Failed to create bucket:', error.message);
      process.exit(1);
    }
    console.log('✅ Bucket created');
  } else {
    console.log('✅ Bucket "fashion" exists');
  }
  
  // Upload all folders
  for (const folder of folders) {
    await uploadFolder(folder.local, folder.remote);
  }
  
  console.log('\n🎉 UPLOAD COMPLETE!');
  console.log('\n🔗 Test URLs:');
  console.log(`${supabaseUrl}/storage/v1/object/public/fashion/body-types/apple.png`);
  console.log(`${supabaseUrl}/storage/v1/object/public/fashion/categories/tshirt.png`);
  console.log(`${supabaseUrl}/storage/v1/object/public/fashion/styles/old-money/colors/ivory.png`);
  
  console.log('\n📝 Next: Test these URLs in browser, then run your app!');
}

main().catch(console.error);