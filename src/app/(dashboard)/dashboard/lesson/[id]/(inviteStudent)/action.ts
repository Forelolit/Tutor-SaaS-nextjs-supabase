import { getCurrentUser } from '@/lib/helpers/getCurrentUser';
import { supabase } from '@/lib/supabase/client';
import { InviteData } from '@/types/inviteData';

interface CreateInviteResponse {
    data: InviteData[] | null;
    error: Error | null;
}

export const createInvite = async (lessonId: string | undefined, email: string): Promise<CreateInviteResponse> => {
    const user = await getCurrentUser();

    const { data, error } = await supabase
        .from('lesson_invites')
        .insert({
            lesson_id: lessonId,
            invited_email: email,
            created_by: user.id,
        })
        .select();

    if (error) {
        console.error('Create invite error:', error.message);
        return { data: null, error };
    }

    return { data, error: null };
};
