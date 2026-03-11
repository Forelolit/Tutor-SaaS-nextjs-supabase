import { dbQuery } from '@/lib/helpers/dbQuery';
import { putUserInStore } from '@/lib/services/user.service';
import { supabase } from '@/lib/supabase/client';

export const signIn = async ({ email, password }: { email: string; password: string }) => {
    const data = await dbQuery(
        supabase.auth.signInWithPassword({
            email,
            password,
        }),
    );

    if (data.user) {
        putUserInStore();
    }
};
