import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function checkSchema() {
  console.log('🔍 Checking database schema...');
  
  // Check body_types columns
  const { data: bodyTypesCols, error: btError } = await supabase
    .from('body_types')
    .select('*')
    .limit(1);
  
  if (btError) {
    console.error('❌ Error checking body_types:', btError);
  } else if (bodyTypesCols && bodyTypesCols.length > 0) {
    console.log('✅ body_types columns:', Object.keys(bodyTypesCols[0]));
  }

  // Check styles columns
  const { data: stylesCols, error: stylesError } = await supabase
    .from('styles')
    .select('*')
    .limit(1);
  
  if (stylesError) {
    console.error('❌ Error checking styles:', stylesError);
  } else if (stylesCols && stylesCols.length > 0) {
    console.log('✅ styles columns:', Object.keys(stylesCols[0]));
  }
}

checkSchema();