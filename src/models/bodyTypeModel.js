// models/bodyTypeModel.js
import { supabase } from '../config/supabaseClient.js';

export const BodyTypeModel = {
  async getAll() {
    const { data, error } = await supabase.from('body_types').select('*');
    if (error) throw error;
    
    // Transform data untuk kompatibilitas frontend
    return data.map(item => {
      const { outerwear, how_to_recognize, ...rest } = item;
      return { 
        ...rest, 
        outer: outerwear,
        howToRecognize: how_to_recognize // ✅ TAMBAHKAN INI
      };
    });
  }
};