import { supabase } from '@/lib/supabase/client';
import { Database } from '@/types/database.types';
import { teacher_submissions_view } from '@/types/submissonViews';

interface GradeSubmittionResponse {
    data: teacher_submissions_view | null;
    error: Error | null;
}

export const gradeSubmittion = async (
    id: string,
    grade: string | null,
    feedback: string,
    status: Database['public']['Enums']['submission_status'],
): Promise<GradeSubmittionResponse> => {
    const updateData: Record<string, unknown> = {
        feedback,
        status,
    };

    if (grade !== null) {
        updateData.grade = Number(grade);
        updateData.graded_at = new Date().toISOString();
    }

    const { data, error } = await supabase.from('task_submissions').update(updateData).eq('id', id).select().single();

    if (error) {
        console.error(error.message);
        return { data: null, error };
    }

    return { data, error: null };
};
