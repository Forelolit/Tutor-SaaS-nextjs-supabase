import { dbQuery } from '@/lib/helpers/dbQuery';
import { getCurrentUser } from '@/lib/helpers/getCurrentUser';
import { supabase } from '@/lib/supabase/client';
import { student_submissions_view } from '@/types/submissonViews';

export const createSubmission = async ({
    taskId,
    answer,
}: {
    taskId: string;
    answer: string;
}): Promise<student_submissions_view> => {
    const user = await getCurrentUser();
    return dbQuery(
        supabase.from('task_submissions').insert({
            student_id: user.id,
            task_id: taskId,
            content: answer,
        }),
    );
};
