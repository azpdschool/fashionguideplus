// scripts/upload-simple.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

console.log('📤 SIMPLE UPLOAD TO SUPABASE\n');

// Pakai URL dan key langsung (hardcode untuk testing)
const SUPABASE_URL = 'https://iabqihvrkrhkawctlthj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhYnFpaHZya3Joa2F3Y3RsdGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0OTY2MTMsImV4cCI6MjA4MDA3MjYxM30.WZVMH85u9K3YATA_lG8Fx2JhmEsIH59u_8Q2LkUVRbc';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Folder yang perlu diupload
const folders = [
  { local: 'public/images/fashion/body-types', remote: 'body-types' },
  { local: 'public/images/fashion/categories', remote: 'categories' },
  { local: 'public/images/fashion/styles', remote: 'styles' }
];

async function uploadImages() {
  console.log('🔗 Connecting to Supabase...');
  
  try {
    // Test connection
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return;
    }
    
    console.log('✅ Connected to Supabase Storage');
    
    // Check/create bucket
    const bucketName = 'fashion';
    const bucketExists = data.some(b => b.name === bucketName);
    
    if (!bucketExists) {
      console.log(`Creating bucket: ${bucketName}`);
      await supabase.storage.createBucket(bucketName, { public: true });
      console.log('✅ Bucket created');
    } else {
      console.log('✅ Bucket exists');
    }
    
    // Upload each folder
    for (const folder of folders) {
      console.log(`\n📁 Uploading: ${folder.local}`);
      
      if (!fs.existsSync(folder.local)) {
        console.log(`   ⚠️  Folder not found`);
        continue;
      }
      
      const files = fs.readdirSync(folder.local)
        .filter(f => f.match(/\.(png|jpg|jpeg|gif)$/i));
      
      console.log(`   Found ${files.length} image(s)`);
      
      for (const file of files) {
        const filePath = path.join(folder.local, file);
        const fileBuffer = fs.readFileSync(filePath);
        const remotePath = `${folder.remote}/${file}`;
        
        console.log(`   📤 ${file}`);
        
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(remotePath, fileBuffer, { upsert: true });
        
        if (uploadError) {
          console.log(`   ⚠️  ${uploadError.message}`);
        } else {
          console.log(`   ✅ Done`);
        }
      }
    }
    
    console.log('\n🎉 UPLOAD COMPLETE!');
    console.log('\n🔗 Test URLs:');
    console.log(`${SUPABASE_URL}/storage/v1/object/public/fashion/body-types/apple.png`);
    console.log(`${SUPABASE_URL}/storage/v1/object/public/fashion/categories/tshirt.png`);
    console.log(`${SUPABASE_URL}/storage/v1/object/public/fashion/styles/old-money/colors/ivory.png`);
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

uploadImages();