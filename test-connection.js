// testConnection.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔐 Testing Supabase connection...');
console.log('URL:', process.env.SUPABASE_URL);
console.log('Key exists:', !!process.env.SUPABASE_KEY);
console.log('Service Key exists:', !!process.env.SUPABASE_SERVICE_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function test() {
  try {
    // Test dengan query sederhana
    const { data, error } = await supabase
      .from('body_types')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      console.log('💡 Hint: Check your SUPABASE_URL and SUPABASE_KEY in .env file');
    } else {
      console.log('✅ Connection successful!');
      console.log('Sample data:', data);
    }
  } catch (err) {
    console.error('❌ Script error:', err.message);
  }
}

test();