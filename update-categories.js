// update-categories.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const categories = [
  {
    id: 'tops',
    name: 'Tops',
    items: [
      { name: 'T-Shirt', image: 'categories/tshirt.jpg' },
      { name: 'Blouse', image: 'categories/blouse.jpg' },
      { name: 'Sweater', image: 'categories/sweater.jpg' },
      { name: 'Tank Top', image: 'categories/tanktop.jpg' },
      { name: 'Crop Top', image: 'categories/croptop.jpg' }
    ]
  },
  {
    id: 'bottoms',
    name: 'Bottoms', 
    items: [
      { name: 'Jeans', image: 'categories/jeans.jpg' },
      { name: 'Trousers', image: 'categories/trousers.jpg' },
      { name: 'Shorts', image: 'categories/shorts.jpg' },
      { name: 'Skirt', image: 'categories/skirt.jpg' }
    ]
  },
  {
    id: 'dresses',
    name: 'Dresses',
    items: [
      { name: 'Maxi Dress', image: 'categories/maxidress.jpg' },
      { name: 'Mini Dress', image: 'categories/minidress.jpg' },
      { name: 'Cocktail Dress', image: 'categories/cocktaildress.jpg' }
    ]
  },
  {
    id: 'outerwear', 
    name: 'Outerwear',
    items: [
      { name: 'Jacket', image: 'categories/jacket.jpg' },
      { name: 'Coat', image: 'categories/coat.jpg' },
      { name: 'Blazer', image: 'categories/blazer.jpg' }
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    items: [
      { name: 'Handbag', image: 'categories/handbag.jpg' },
      { name: 'Scarf', image: 'categories/scarf.jpg' },
      { name: 'Hat', image: 'categories/hat.jpg' }
    ]
  }
];

async function updateCategories() {
  console.log('🔄 Updating categories...');
  
  const { data, error } = await supabase
    .from('categories')
    .upsert(categories, { onConflict: 'id' });
  
  if (error) {
    console.error('❌ Error:', error);
  } else {
    console.log('✅ Categories updated!');
  }
}

updateCategories();