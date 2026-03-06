import { supabase } from '@/lib/supabase/client';
import { teacher_submissions_view } from '@/types/submissonViews';

interface GetStudentSubmissionByIdResponse {
    data: teacher_submissions_view | null;
    error: Error | null;
}

export const getStudentSubmissionById = async (id: string): Promise<GetStudentSubmissionByIdResponse> => {
    const { data, error } = await supabase.from('teacher_submissions_view').select('*').eq('id', id).single();

    if (error) {
        console.error(error.message);
        return { data: null, error };
    }

    return { data, error: null };
};
