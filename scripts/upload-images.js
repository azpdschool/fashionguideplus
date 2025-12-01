require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Konfigurasi Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Mapping folder lokal ke bucket Supabase
const folders = [
  {
    localPath: './public/images/fashion/body-types',
    bucketName: 'fashion',
    supabasePath: 'body-types'
  },
  {
    localPath: './public/images/fashion/dictionary',
    bucketName: 'fashion',
    supabasePath: 'dictionary'
  },
  {
    localPath: './public/images/fashion/categories',
    bucketName: 'fashion',
    supabasePath: 'categories'
  },
  {
    localPath: './public/images/fashion/styles',
    bucketName: 'fashion',
    supabasePath: 'styles'
  }
];

async function uploadFolder({ localPath, bucketName, supabasePath }) {
  if (!fs.existsSync(localPath)) {
    console.log(`❌ Folder tidak ditemukan: ${localPath}`);
    return;
  }

  const files = fs.readdirSync(localPath);
  
  for (const file of files) {
    const filePath = path.join(localPath, file);
    const fileBuffer = fs.readFileSync(filePath);
    const supabaseFilePath = `${supabasePath}/${file}`;

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(supabaseFilePath, fileBuffer, {
        upsert: true,
        contentType: getContentType(file)
      });

    if (error) {
      console.log(`❌ Gagal upload ${file}:`, error.message);
    } else {
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${supabaseFilePath}`;
      console.log(`✅ Uploaded: ${file}`);
      console.log(`   URL: ${publicUrl}`);
    }
  }
}

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const types = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  };
  return types[ext] || 'image/png';
}

async function main() {
  console.log('🚀 Mulai upload gambar ke Supabase Storage...\n');
  
  for (const folder of folders) {
    console.log(`📁 Uploading: ${folder.localPath}`);
    await uploadFolder(folder);
    console.log('---');
  }
  
  console.log('✅ Semua gambar berhasil diupload!');
}

main().catch(console.error);