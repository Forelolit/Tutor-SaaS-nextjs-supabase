import { dbQuery } from '@/lib/helpers/dbQuery';
import { supabase } from '@/lib/supabase/client';
import { SubmittionStatus, TaskSubmissionsData } from '@/types/taskSubmittionsData';

export const gradeSubmittion = async ({
    id,
    grade,
    feedback,
    status,
}: {
    id: string;
    grade: string | null;
    feedback: string;
    status: SubmittionStatus;
}): Promise<TaskSubmissionsData> => {
    const updateData: Record<string, unknown> = {
        feedback,
        status,
    };

    if (grade !== null) {
        updateData.grade = Number(grade);
        updateData.graded_at = new Date().toISOString();
    }

    return dbQuery(supabase.from('task_submissions').update(updateData).eq('id', id).select().single());
};
