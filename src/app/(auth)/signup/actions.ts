import { dbQuery } from '@/lib/helpers/dbQuery';
import { putUserInStore } from '@/lib/services/user.service';
import { supabase } from '@/lib/supabase/client';

interface userSignUpData {
    firstname: string;
    lastname: string;
    email: string;
    userRole: string;
    password: string;
}

export const signUp = async ({ firstname, lastname, email, userRole, password }: userSignUpData) => {
    const data = await dbQuery(
        supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstname,
                    last_name: lastname,
                    role: userRole,
                },
            },
        }),
    );

    if (data.session.access_token !== '' || null) {
        putUserInStore();
    }
};

export const googleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:3000',
        },
    });
};
