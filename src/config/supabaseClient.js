import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

// Untuk server-side (Node.js), baca tanpa VITE_ prefix
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Gunakan service role key untuk server

export const supabase = createClient(supabaseUrl, supabaseKey);