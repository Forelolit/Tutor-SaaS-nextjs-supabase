import { putUserInStore } from '@/lib/services/user.service';
import { supabase } from '@/lib/supabase/client';

export const signin = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (data.session?.access_token !== '' || null) {
        putUserInStore();
    }

    return { data, error };
};
