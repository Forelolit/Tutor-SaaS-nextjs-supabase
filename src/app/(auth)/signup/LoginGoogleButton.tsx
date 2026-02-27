'use client';

import { Button } from '@/components';
import { supabase } from '@/lib/supabase/client';

export default function LoginGoogleButton() {
    const login = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000',
            },
        });
    };

    return <Button onClick={login}>Login with Google</Button>;
}
