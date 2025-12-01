// scripts/upload-to-supabase.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📤 UPLOADING IMAGES TO SUPABASE STORAGE\n');

// Konfigurasi dari .env kamu
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://iabqihvrkrhkawctlthj.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_KEY || 'your-key-here';

if (!supabaseKey.includes('eyJ')) {
  console.error('❌ ERROR: Missing or invalid Supabase key in .env file');
  console.error('Please check VITE_SUPABASE_KEY in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET_NAME = 'fashion';

console.log(`🔗 Supabase URL: ${supabaseUrl}`);
console.log(`📦 Target Bucket: ${BUCKET_NAME}\n`);

// Struktur folder
const folders = [
  { local: './public/images/fashion/body-types', remote: 'body-types' },
  { local: './public/images/fashion/categories', remote: 'categories' },
  { local: './public/images/fashion/dictionary', remote: 'dictionary' },
  { local: './public/images/fashion/styles', remote: 'styles' }
];

async function uploadImage(localPath, remotePath) {
  try {
    const fileBuffer = fs.readFileSync(localPath);
    const fileName = path.basename(localPath);
    
    console.log(`   Uploading: ${fileName}`);
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(`${remotePath}/${fileName}`, fileBuffer, {
        upsert: true,
        contentType: 'image/png'
      });
    
    if (error) {
      if (error.message.includes('already exists')) {
        console.log(`   ⚠️  Already exists: ${fileName}`);
        return true;
      }
      throw error;
    }
    
    console.log(`   ✅ Success: ${fileName}`);
    return true;
    
  } catch (error) {
    console.log(`   ❌ Failed: ${path.basename(localPath)} - ${error.message}`);
    return false;
  }
}

async function uploadFolder(localFolder, remoteFolder) {
  console.log(`📁 Folder: ${localFolder}`);
  
  if (!fs.existsSync(localFolder)) {
    console.log(`   ⚠️  Folder not found: ${localFolder}`);
    return;
  }
  
  const files = fs.readdirSync(localFolder)
    .filter(file => /\.(png|jpg|jpeg|gif|svg)$/i.test(file));
  
  if (files.length === 0) {
    console.log(`   ℹ️  No images found`);
    return;
  }
  
  console.log(`   Found ${files.length} image(s)`);
  
  let success = 0;
  for (const file of files) {
    const localPath = path.join(localFolder, file);
    const uploaded = await uploadImage(localPath, remoteFolder);
    if (uploaded) success++;
  }
  
  console.log(`   📊 Result: ${success}/${files.length} uploaded\n`);
}

async function main() {
  console.log('🚀 Starting upload process...\n');
  
  // Cek bucket exists
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  
  if (bucketError) {
    console.error('❌ Cannot access Supabase Storage:', bucketError.message);
    console.error('\nCheck:');
    console.error('1. Is your Supabase key correct?');
    console.error('2. Does your key have storage permissions?');
    process.exit(1);
  }
  
  const bucketExists = buckets.some(b => b.name === BUCKET_NAME);
  
  if (!bucketExists) {
    console.log(`⚠️  Bucket '${BUCKET_NAME}' doesn't exist. Creating...`);
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 52428800 // 50MB
    });
    
    if (createError) {
      console.error('❌ Failed to create bucket:', createError.message);
      process.exit(1);
    }
    console.log(`✅ Created bucket: ${BUCKET_NAME}`);
  }
  
  // Upload semua folder
  for (const folder of folders) {
    await uploadFolder(folder.local, folder.remote);
  }
  
  console.log('✅ UPLOAD COMPLETE!');
  console.log('\n🔗 Test URLs:');
  console.log(`${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/body-types/apple.png`);
  console.log(`${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/categories/tshirt.png`);
  console.log('\n📝 Next: Test if images load in your app!');
}

main().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});