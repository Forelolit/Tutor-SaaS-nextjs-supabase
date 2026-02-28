'use client';

import { supabase } from '@/lib/supabase/client';
import { useUserStore } from './useUserStore';
import { Database } from '@/types/database';

type User = Database['public']['Tables']['profiles']['Row'];

type Session = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at?: number;
    token_type: string;
    user: User;
};

export const putUserInStore = async () => {
    const raw = localStorage.getItem('sb-ntpexdrrhqzhhnibdrgp-auth-token');
    const session: Session | null = raw ? JSON.parse(raw) : null;

    if (session === null) {
        return console.error('Session is null');
    }

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

    if (profileError) throw profileError;

    useUserStore.getState().setUser({
        id: profile.id,
        email: profile.email ?? '',
        first_name: profile.first_name ?? '',
        last_name: profile.last_name ?? '',
        role: profile.role,
        created_at: Number(profile.created_at),
    });
};
