import { supabase } from '../config/supabaseClient.js';

export const CategoryModel = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      return data;
    } catch (err) {
      console.error('Model error:', err);
      throw err;
    }
  }
};