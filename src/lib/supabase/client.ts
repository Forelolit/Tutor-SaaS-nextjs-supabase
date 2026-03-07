import { Database } from '@/types/database.types';
import { createClient } from '@supabase/supabase-js';

export const getSupabaseClient = () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Supabase URL and ANON_KEY must be set');
    }

    return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
};

export const supabase = getSupabaseClient();
