import { supabase } from '@/lib/supabase/client';
import { useUserStore } from '@/stores/user/useUserStore';
import { getCurrentUser } from '../helper/getCurrentUser';

export const putUserInStore = async () => {
    const user = await getCurrentUser();

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
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
