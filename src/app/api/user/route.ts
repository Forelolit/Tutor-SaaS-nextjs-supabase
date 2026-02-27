'use client';

import { supabase } from '@/lib/supabase/client';
import { useUserStore } from './useUserStore';

type Session = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at?: number;
    token_type: string;
    user: User;
};

type User = {
    id: string;
    email?: string;
    user_metadata: {
        first_name?: string;
        last_name?: string;
        role?: string;
    };
    app_metadata: Record<string, unknown>;
};

export const putUserInStore = async () => {
    const raw = localStorage.getItem('sb-ntpexdrrhqzhhnibdrgp-auth-token');
    const session: Session | null = raw ? JSON.parse(raw) : null;

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session?.user.id)
        .single();

    if (profileError) throw profileError;

    useUserStore.getState().setUser({
        id: profile.id,
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        role: profile.role,
        created_at: profile.created_at,
    });
};
