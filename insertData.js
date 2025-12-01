import { createClient } from '@supabase/supabase-js';
import { bodyTypes } from './src/data/bodyTypes.js';
import { categories } from './src/data/categories.js';
import { dictionary } from './src/data/dictionary.js';
import { styles } from './src/data/styles.js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Di insertData.js - GANTI function uploadImageAndGetUrl dengan ini:
async function uploadImageAndGetUrl(imagePath, folder) {
  try {
    const fileName = imagePath.split('/').pop();
    
    // SELALU gunakan URL Supabase, karena kita sudah upload semua gambar
    const publicUrl = `https://iabqihvrkrhkawctlthj.supabase.co/storage/v1/object/public/fashion-images/${folder}/${fileName}`;
    
    console.log(`📁 Converted: ${imagePath} → ${publicUrl}`);
    return publicUrl;
    
  } catch (error) {
    console.error(`Error getting URL for ${imagePath}:`, error);
    return `https://placehold.co/400x300/EFEFEF/666666?text=Image+Error`;
  }
}

// FUNCTION: Process image paths dalam object
async function processImages(data, folder) {
  if (typeof data === 'string' && data.includes('/images/fashion/')) {
    return await uploadImageAndGetUrl(data, folder);
  }
  
  if (Array.isArray(data)) {
    const results = [];
    for (const item of data) {
      if (typeof item === 'string' && item.includes('/images/fashion/')) {
        results.push(await uploadImageAndGetUrl(item, folder));
      } else if (typeof item === 'object' && item.image) {
        results.push({
          ...item,
          image: await uploadImageAndGetUrl(item.image, folder)
        });
      } else {
        results.push(item);
      }
    }
    return results;
  }
  
  if (typeof data === 'object' && data.image) {
    return {
      ...data,
      image: await uploadImageAndGetUrl(data.image, folder)
    };
  }
  
  return data;
}

async function insertData() {
  try {
    console.log('🚀 Starting data insertion with Supabase Storage URLs...');

    // ===== DEBUG: CEK DATA SOURCE =====
    console.log('\n📊 DEBUG - Data Source Check:');
    console.log('bodyTypes count:', bodyTypes?.length || 0);
    console.log('categories count:', categories?.length || 0);
    console.log('dictionary count:', dictionary?.length || 0);
    console.log('styles count:', styles?.length || 0);

    if (!bodyTypes || bodyTypes.length === 0) {
      console.error('❌ ERROR: bodyTypes data is empty or not loaded');
      return;
    }

    // ===== BODY TYPES =====
    console.log('\n🔄 Processing body types...');
    const bodyTypesForInsert = [];
    
    for (const bodyType of bodyTypes) {
      console.log(`  Processing: ${bodyType.name}`);
      
      const processedBodyType = {
        ...bodyType,
        image: await uploadImageAndGetUrl(bodyType.image, 'body-types'),
        tops: await processImages(bodyType.tops, 'body-types'),
        bottoms: await processImages(bodyType.bottoms, 'body-types'),
        dress: await processImages(bodyType.dress, 'body-types'),
        outer: await processImages(bodyType.outer, 'body-types'),
        how_to_recognize: bodyType.howToRecognize,
        outerwear: bodyType.outer
      };
      
      delete processedBodyType.howToRecognize;
      delete processedBodyType.outer;
      
      bodyTypesForInsert.push(processedBodyType);
    }

    console.log(`📤 Inserting ${bodyTypesForInsert.length} body types...`);
    const { error: bodyTypesError, data: bodyTypesData } = await supabase
      .from('body_types')
      .upsert(bodyTypesForInsert, { 
        onConflict: 'name' 
      })
      .select();
    
    if (bodyTypesError) {
      console.error('❌ Error upserting body types:', bodyTypesError);
    } else {
      console.log(`✅ Body types upserted: ${bodyTypesData?.length || 0} records`);
    }

    // ===== CATEGORIES =====
    console.log('\n🔄 Processing categories...');
    if (!categories || categories.length === 0) {
      console.log('⚠️  No categories data found');
    } else {
      console.log(`📤 Inserting ${categories.length} categories...`);
      const { error: categoriesError, data: categoriesData } = await supabase
        .from('categories')
        .upsert(categories, { 
          onConflict: 'name' 
        });
      
      if (categoriesError) {
        console.error('❌ Error upserting categories:', categoriesError);
      } else {
        console.log(`✅ Categories upserted: ${categories.length} records`);
      }
    }

    // ===== DICTIONARY =====
    console.log('\n🔄 Processing dictionary...');
    const dictionaryForInsert = [];
    
    if (!dictionary || dictionary.length === 0) {
      console.log('⚠️  No dictionary data found');
    } else {
      for (const term of dictionary) {
        const processedTerm = {
          ...term,
          image: await uploadImageAndGetUrl(term.image, 'dictionary')
        };
        dictionaryForInsert.push(processedTerm);
      }

      console.log(`📤 Inserting ${dictionaryForInsert.length} dictionary terms...`);
      const { error: dictionaryError, data: dictionaryData } = await supabase
        .from('dictionary')
        .upsert(dictionaryForInsert, {
          onConflict: 'term'
        });
      
      if (dictionaryError) {
        console.error('❌ Error upserting dictionary:', dictionaryError);
      } else {
        console.log(`✅ Dictionary upserted: ${dictionaryForInsert.length} records`);
      }
    }

    // ===== STYLES =====
    console.log('\n🔄 Processing styles...');
    const stylesForInsert = [];
    
    if (!styles || styles.length === 0) {
      console.log('⚠️  No styles data found');
    } else {
      for (const style of styles) {
        console.log(`  Processing: ${style.name}`);
        
        const processedStyle = {
          ...style,
          description: style.desc,
          items_gallery: await processImages(style.itemsGallery, 'styles'),
          palettes: await processImages(style.palettes, 'styles'),
          fabrics: await processImages(style.fabrics, 'styles'),
          patterns: await processImages(style.patterns, 'styles'),
          outfits: await processImages(style.outfits, 'styles')
        };
        
        delete processedStyle.desc;
        delete processedStyle.itemsGallery;
        
        stylesForInsert.push(processedStyle);
      }

      console.log(`📤 Inserting ${stylesForInsert.length} styles...`);
      const { error: stylesError, data: stylesData } = await supabase
        .from('styles')
        .upsert(stylesForInsert, {
          onConflict: 'name'
        });
      
      if (stylesError) {
        console.error('❌ Error upserting styles:', stylesError);
      } else {
        console.log(`✅ Styles upserted: ${stylesForInsert.length} records`);
      }
    }

    console.log('\n🎉 Data insertion process completed!');
    
    // Final verification
    await verifyData();

  } catch (error) {
    console.error('💥 Error in insertData:', error);
  }
}

// FUNCTION: Verify data was inserted
async function verifyData() {
  console.log('\n🔍 Verifying data insertion...');
  
  try {
    const { data: bodyTypes, error: btError } = await supabase
      .from('body_types')
      .select('id, name')
      .limit(5);
    
    if (btError) {
      console.error('❌ Error verifying body_types:', btError);
    } else {
      console.log(`✅ body_types: ${bodyTypes?.length || 0} records found`);
      if (bodyTypes && bodyTypes.length > 0) {
        console.log('   Sample:', bodyTypes.map(bt => bt.name));
      }
    }

    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('id, name')
      .limit(5);
    
    if (catError) {
      console.error('❌ Error verifying categories:', catError);
    } else {
      console.log(`✅ categories: ${categories?.length || 0} records found`);
    }

    const { data: dictionary, error: dictError } = await supabase
      .from('dictionary')
      .select('id, term')
      .limit(5);
    
    if (dictError) {
      console.error('❌ Error verifying dictionary:', dictError);
    } else {
      console.log(`✅ dictionary: ${dictionary?.length || 0} records found`);
    }

    const { data: styles, error: stylesError } = await supabase
      .from('styles')
      .select('id, name')
      .limit(5);
    
    if (stylesError) {
      console.error('❌ Error verifying styles:', stylesError);
    } else {
      console.log(`✅ styles: ${styles?.length || 0} records found`);
    }

  } catch (error) {
    console.error('Error during verification:', error);
  }
}

insertData();