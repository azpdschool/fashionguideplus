// uploadMissingImages.js
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

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
    
    // Skip if already exists
    const { data: existing } = await supabase.storage
      .from(BUCKET_NAME)
      .list(folder, { search: fileName })
    
    if (existing && existing.length > 0) {
      console.log(`⏭️  Already exists: ${storagePath}`)
      return null
    }
    
    const fileContent = fs.readFileSync(filePath)
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileContent, {
        cacheControl: '3600',
        upsert: true
      })
    
    if (error) {
      console.error(`❌ Error uploading ${fileName}:`, error)
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

async function uploadMissingImages() {
  console.log('🚀 Uploading missing images to Supabase Storage...')
  
  const sourceDir = './public/images/fashion'
  
  if (!fs.existsSync(sourceDir)) {
    console.log('❌ Source directory not found:', sourceDir)
    return
  }
  
  // Process all files recursively
  async function processDirectory(dir, baseFolder = '') {
    const items = fs.readdirSync(dir)
    
    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        await processDirectory(fullPath, item)
      } else if (stat.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(item)) {
        // Determine folder based on path structure
        let folder = 'body-types' // default
        
        if (dir.includes('old-money')) folder = 'styles'
        else if (dir.includes('body-types')) folder = 'body-types'
        else if (dir.includes('categories')) folder = 'categories' 
        else if (dir.includes('dictionary')) folder = 'dictionary'
        else if (dir.includes('styles')) folder = 'styles'
        else {
          // Try to infer from file name or parent directory
          const parentDir = path.basename(dir)
          if (['tops', 'bottoms', 'dress', 'outer'].includes(parentDir)) {
            folder = 'body-types'
          } else {
            folder = parentDir
          }
        }
        
        await uploadImageToStorage(fullPath, folder)
      }
    }
  }
  
  await processDirectory(sourceDir)
  console.log('\n🎉 Missing images upload completed!')
}

uploadMissingImages()