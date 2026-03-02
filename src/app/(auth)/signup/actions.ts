import { putUserInStore } from '@/lib/services/user.service';
import { supabase } from '@/lib/supabase/client';

export const signup = async (first_name: string, last_name: string, email: string, role: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name,
                last_name,
                role,
            },
        },
    });

    if (data.session?.access_token !== '' || null) {
        putUserInStore();
    }

    return { data, error };
};

export const googleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:3000',
        },
    });
};
