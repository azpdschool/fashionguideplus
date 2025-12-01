// uploadImagesToSupabase.js
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const BUCKET_NAME = 'fashion-images'

async function uploadImageToStorage(filePath, folder) {
  try {
    const fileName = path.basename(filePath)
    const storagePath = `${folder}/${fileName}`
    
    const fileContent = fs.readFileSync(filePath)
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileContent, {
        cacheControl: '3600',
        upsert: true
      })
    
    if (error) {
      console.error(`Error uploading ${fileName}:`, error)
      return null
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(storagePath)
    
    console.log(`✅ Uploaded: ${storagePath}`)
    return publicUrl
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error)
    return null
  }
}

async function uploadAllImages() {
  console.log('🚀 Starting image upload to Supabase Storage...')
  
  const imageDirs = [
    { path: './src/data/images/body-types', folder: 'body-types' },
    { path: './src/data/images/categories', folder: 'categories' },
    { path: './src/data/images/dictionary', folder: 'dictionary' },
    { path: './src/data/images/styles', folder: 'styles' }
  ]
  
  for (const dir of imageDirs) {
    try {
      if (!fs.existsSync(dir.path)) {
        console.log(`⚠️ Directory not found: ${dir.path}`)
        continue
      }
      
      const files = fs.readdirSync(dir.path)
      const imageFiles = files.filter(file => 
        /\.(png)$/i.test(file) // Hanya PNG
      )
      
      console.log(`\n📁 Processing ${dir.folder}: ${imageFiles.length} images`)
      
      for (const file of imageFiles) {
        const filePath = path.join(dir.path, file)
        await uploadImageToStorage(filePath, dir.folder)
      }
      
    } catch (error) {
      console.error(`Error processing directory ${dir.path}:`, error)
    }
  }
  
  console.log('\n🎉 Image upload process completed!')
}

uploadAllImages()