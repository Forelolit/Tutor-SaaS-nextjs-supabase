import { supabase } from '@/lib/supabase/client';
import { teacher_submissions_view } from '@/types/submissonViews';

interface GetStudentSubmissionResponse {
    data: teacher_submissions_view[] | null;
    error: Error | null;
}

export const getStudentSubmission = async (): Promise<GetStudentSubmissionResponse> => {
    const { data, error } = await supabase.from('teacher_submissions_view').select('*');

    if (error) {
        console.error(error.message);
        return { data: null, error };
    }

    return { data, error: null };
};
