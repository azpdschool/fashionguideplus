import { supabase } from '../config/supabaseClient.js';

export const DictionaryModel = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('dictionary')
        .select('*')
        .order('term', { ascending: true });
      
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