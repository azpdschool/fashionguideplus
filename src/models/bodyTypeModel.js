import { supabase } from '../config/supabaseClient.js';

export const BodyTypeModel = {
  async getAll() {
    const { data, error } = await supabase
      .from('body_types')
      .select('*');
    
    if (error) throw error;
    return data;
  }
};