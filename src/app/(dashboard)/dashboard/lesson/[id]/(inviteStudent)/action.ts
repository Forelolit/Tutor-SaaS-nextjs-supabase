import { dbQuery } from '@/lib/helpers/dbQuery';
import { getCurrentUser } from '@/lib/helpers/getCurrentUser';
import { supabase } from '@/lib/supabase/client';
import { InviteData } from '@/types/inviteData';

export const createInvite = async ({ lessonId, email }: { lessonId: string; email: string }): Promise<InviteData> => {
    const user = await getCurrentUser();

    return dbQuery(
        supabase
            .from('lesson_invites')
            .insert({
                lesson_id: lessonId,
                invited_email: email,
                created_by: user.id,
            })
            .select(),
    );
};
