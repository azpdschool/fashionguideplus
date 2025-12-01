// deleteDuplicatesSimple.js - FIXED VERSION
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function deleteDuplicates() {
  console.log('🗑️ Deleting duplicate data...');

  try {
    const tables = ['body_types', 'categories', 'dictionary', 'styles'];
    
    for (const table of tables) {
      console.log(`\n🧹 Clearing ${table}...`);
      
      // Untuk UUID, kita perlu approach yang berbeda
      // Option 1: Hapus semua data dengan kondisi yang selalu true
      const { error } = await supabase
        .from(table)
        .delete()
        .not('id', 'is', null); // Kondisi yang selalu true

      if (error) {
        console.error(`❌ Error clearing ${table}:`, error.message);
        
        // Option 2: Jika masih error, coba approach manual
        console.log(`Trying manual approach for ${table}...`);
        await deleteAllRecordsManual(table);
      } else {
        console.log(`✅ ${table} cleared successfully`);
      }
    }

    console.log('\n🎉 All tables cleared! Ready for fresh data insert.');
    
  } catch (error) {
    console.error('❌ Script failed:', error.message);
  }
}

async function deleteAllRecordsManual(tableName) {
  try {
    // Dapatkan semua record
    const { data: records, error } = await supabase
      .from(tableName)
      .select('id');
    
    if (error) {
      console.error(`Error fetching ${tableName}:`, error.message);
      return;
    }
    
    if (records.length === 0) {
      console.log(`✅ ${tableName} is already empty`);
      return;
    }
    
    // Hapus satu per satu (fallback)
    console.log(`Deleting ${records.length} records from ${tableName}...`);
    
    for (const record of records) {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', record.id);
      
      if (error) {
        console.error(`Error deleting record ${record.id}:`, error.message);
      }
    }
    
    console.log(`✅ Manual deletion completed for ${tableName}`);
  } catch (err) {
    console.error(`Manual deletion failed for ${tableName}:`, err.message);
  }
}

deleteDuplicates();