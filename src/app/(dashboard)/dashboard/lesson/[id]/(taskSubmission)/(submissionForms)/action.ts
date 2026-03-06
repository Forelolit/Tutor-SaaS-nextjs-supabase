import { getCurrentUser } from '@/lib/helpers/getCurrentUser';
import { supabase } from '@/lib/supabase/client';
import { SubmissionData } from '@/types/submissonData';

interface CreateSubmissionResponse {
    data: SubmissionData | null;
    error: Error | null;
}

export const createSubmission = async (task_id: string, answer: string): Promise<CreateSubmissionResponse> => {
    const user = await getCurrentUser();

    const { data, error } = await supabase.from('task_submissions').insert({
        task_id,
        student_id: user.id,
        content: answer,
    });

    if (error) {
        console.error(error.message);
        return { data: null, error };
    }

    return { data, error: null };
};
