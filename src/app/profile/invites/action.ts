import { getCurrentUser } from '@/lib/helpers/getCurrentUser';
import { supabase } from '@/lib/supabase/client';
import { InviteData } from '@/types/inviteData';
import { LessonStudentsData } from '@/types/lessonStudentsData';

interface InviteResponse {
    data: LessonStudentsData | null;
    error: Error | null;
}

export const acceptInvite = async (token: string): Promise<InviteResponse> => {
    const { data: invite, error } = await supabase
        .from('lesson_invites')
        .select('*')
        .eq('token', token)
        .is('used_at', null)
        .single();

    if (error || !invite) {
        console.error(error?.message || 'Invite not found or already used');
        return { data: null, error: error ?? new Error('Invite not found or already used') };
    }

    const { error: updateError } = await supabase
        .from('lesson_invites')
        .update({ used_at: new Date().toISOString() })
        .eq('id', invite.id);

    if (updateError) {
        console.error(updateError.message);
        return { data: null, error: updateError };
    }

    const insertResult = await insertToLesson(invite);

    if (insertResult.error) {
        return { data: null, error: insertResult.error };
    }

    return { data: insertResult.data, error: null };
};

const insertToLesson = async (invite: InviteData): Promise<InviteResponse> => {
    const user = await getCurrentUser();

    if (!user) {
        return { data: null, error: new Error('User not logged in') };
    }

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
