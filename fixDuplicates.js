// fixDuplicates.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY
);

async function fixDuplicates() {
  console.log('🔧 Fixing duplicate data...');

  const tables = [
    { name: 'body_types', uniqueColumn: 'name' },
    { name: 'categories', uniqueColumn: 'name' },
    { name: 'dictionary', uniqueColumn: 'term' },
    { name: 'styles', uniqueColumn: 'name' }
  ];

  for (const table of tables) {
    console.log(`\n📋 Processing ${table.name}...`);
    
    // Dapatkan semua data
    const { data: allData, error } = await supabase
      .from(table.name)
      .select('*');

    if (error) {
      console.error(`❌ Error fetching ${table.name}:`, error);
      continue;
    }

    console.log(`📊 Total records in ${table.name}: ${allData.length}`);

    // Identifikasi duplikat
    const seen = new Map();
    const duplicatesToDelete = [];

    for (const row of allData) {
      const key = row[table.uniqueColumn];
      if (seen.has(key)) {
        console.log(`🔍 Found duplicate: ${key} (ID: ${row.id})`);
        duplicatesToDelete.push(row.id);
      } else {
        seen.set(key, row.id);
      }
    }

    console.log(`🎯 Found ${duplicatesToDelete.length} duplicates in ${table.name}`);

    // Hapus duplikat jika ada
    if (duplicatesToDelete.length > 0) {
      console.log(`🗑️ Deleting ${duplicatesToDelete.length} duplicates...`);
      
      const { error: deleteError } = await supabase
        .from(table.name)
        .delete()
        .in('id', duplicatesToDelete);

      if (deleteError) {
        console.error(`❌ Error deleting duplicates:`, deleteError);
      } else {
        console.log(`✅ Successfully deleted ${duplicatesToDelete.length} duplicates`);
      }
    }
  }

  console.log('\n🎉 All duplicates fixed!');
}

fixDuplicates();