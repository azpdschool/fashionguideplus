import { supabase } from '../config/supabaseClient.js';

export const DictionaryModel = {
  async getAll() {
    const { data, error } = await supabase
      .from('dictionary')
      .select('*')
      .order('term', { ascending: true });
    
    if (error) throw error;
    return data;
  }
};