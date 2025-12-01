import { supabase } from '../config/supabaseClient.js';

export const StyleModel = {
  async getAll() {
    const { data, error } = await supabase.from('styles').select('*');
    if (error) throw error;
    
    // Transform data: description -> desc untuk kompatibilitas frontend
    return data.map(item => {
      const { description, ...rest } = item;
      return { ...rest, desc: description };
    });
  }
};