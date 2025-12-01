// checkUploadedFiles.js
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

async function listAllFiles() {
  console.log('📁 Listing all files in Supabase Storage...\n')
  
  const folders = ['body-types', 'categories', 'dictionary', 'styles']
  
  for (const folder of folders) {
    console.log(`\n=== ${folder.toUpperCase()} ===`)
    const { data, error } = await supabase.storage
      .from('fashion-images')
      .list(folder)
    
    if (error) {
      console.error(`Error listing ${folder}:`, error)
      continue
    }
    
    if (data && data.length > 0) {
      data.forEach(file => console.log(`📄 ${file.name}`))
    } else {
      console.log('No files found')
    }
  }
}

listAllFiles()