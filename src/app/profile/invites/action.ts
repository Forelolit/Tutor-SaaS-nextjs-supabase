import { getCurrentUser } from '@/lib/helper/getCurrentUser';
import { supabase } from '@/lib/supabase/client';
import { InviteData } from '@/types/inviteData';

interface getInvitesResponse {
    data: InviteData[] | null;
    error: Error | null;
}

export const getInvites = async (): Promise<getInvitesResponse> => {
    const user = await getCurrentUser();

    const { data, error } = await supabase
        .from('lesson_invites')
        .select('*')
        .eq('invited_email', user.email)
        .is('used_at', null);

    if (error) {
        console.error('Create invite error:', error.message);
        return { data: null, error };
    }

    return { data, error: null };
};
