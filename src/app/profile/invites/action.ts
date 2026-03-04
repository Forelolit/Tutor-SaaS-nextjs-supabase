import { getCurrentUser } from '@/lib/helper/getCurrentUser';
import { supabase } from '@/lib/supabase/client';
import { InviteData } from '@/types/inviteData';

interface AcceptInviteResponse {
    data: InviteData | null;
    error: Error | null;
}

export const acceptInvite = async (token: string): Promise<AcceptInviteResponse> => {
    const { data: invite, error } = await supabase
        .from('lesson_invites')
        .select('*')
        .eq('token', token)
        .is('used_at', null)
        .single();

    if (error) {
        console.error(error.message);
        return { data: null, error };
    }

    const { error: updateError } = await supabase
        .from('lesson_invites')
        .update({ used_at: new Date().toISOString() })
        .eq('id', invite.id);

    if (updateError) {
        console.error(updateError.message);
        return { data: null, error: updateError };
    }

    if (invite) {
        const res = await insertToLesson(invite);
        return { ...res };
    }

    return { data: null, error };
};

interface InsertInviteResponse {
    data: InviteData | null;
    error: Error | null;
}

const insertToLesson = async (invite: InviteData): Promise<InsertInviteResponse> => {
    const user = await getCurrentUser();

    const { data, error } = await supabase
        .from('lesson_students')
        .insert({
            lesson_id: invite.lesson_id,
            student_id: user.id,
        })
        .select()
        .single();

    if (error) {
        console.error(error.message);
        return { data: null, error };
    }

    return { data, error: null };
};
