import { dbQuery } from '@/lib/helpers/dbQuery';
import { getCurrentUser } from '@/lib/helpers/getCurrentUser';
import { supabase } from '@/lib/supabase/client';
import { InviteData } from '@/types/inviteData';
import { student_lesson_invites_view } from '@/types/inviteView';
import { useQuery } from '@tanstack/react-query';

export const getInvites = async (): Promise<student_lesson_invites_view[]> => {
    return dbQuery(supabase.from('student_lesson_invites_view').select('*').is('used_at', null));
};

export const useGetInvites = () => {
    return useQuery({
        queryKey: ['invites'],
        queryFn: getInvites,
    });
};

export const acceptInvite = async ({ token }: { token: string }) => {
    const user = await getCurrentUser();

    const invite = await dbQuery<InviteData>(
        supabase.from('lesson_invites').select('*').eq('token', token).is('used_at', null).single(),
    );

    dbQuery(supabase.from('lesson_invites').update({ used_at: new Date().toISOString() }).eq('id', invite.id));

    dbQuery(supabase.from('lesson_students').insert({ lesson_id: invite.lesson_id, student_id: user.id }));
};
