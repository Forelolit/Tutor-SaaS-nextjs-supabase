import { authQuery } from '@/lib/helpers/authQuery';
import { putUserInStore } from '@/lib/services/user.service';
import { supabase } from '@/lib/supabase/client';

export const signIn = async ({ email, password }: { email: string; password: string }) => {
    const authData = await authQuery(
        supabase.auth.signInWithPassword({
            email,
            password,
        }),
    );

    if (authData.session?.access_token) {
        putUserInStore();
    }
};
