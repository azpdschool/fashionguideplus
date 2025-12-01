import { supabase } from '../config/supabaseClient.js';

export const StyleModel = {
  async getAll() {
    const { data, error } = await supabase
      .from('styles')
      .select('*');
    
    if (error) throw error;
    return data;
  }
};