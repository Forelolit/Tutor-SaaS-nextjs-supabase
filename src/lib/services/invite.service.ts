import { supabase } from '@/lib/supabase/client';
import { getCurrentUser } from '@/lib/helper/getCurrentUser';
import { InviteData } from '@/types/inviteData';
import { useInvitesStore } from '@/stores/invites/useInvitesStore';

interface initInvitesListenerResponse {
    data: InviteData[] | null;
    error: Error | null;
}

export const initInvitesListener = async (): Promise<initInvitesListenerResponse> => {
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

    if (data) {
        useInvitesStore.getState().setInvites(data);
    }

    return { data, error: null };
};
