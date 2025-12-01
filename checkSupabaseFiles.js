// checkSupabaseFiles.js
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const BUCKET_NAME = 'fashion-images'

async function listFiles(folder = '') {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(folder)

  if (error) {
    console.error(`Error listing folder ${folder}:`, error)
    return
  }

  console.log(`Files in ${folder || 'root'}:`)
  data.forEach(file => {
    console.log(` - ${file.name} (folder: ${file.id})`)
  })
}

async function checkAllFolders() {
  console.log('Checking all folders...')
  await listFiles('body-types')
  await listFiles('categories')
  await listFiles('dictionary')
  await listFiles('styles')
}

checkAllFolders()