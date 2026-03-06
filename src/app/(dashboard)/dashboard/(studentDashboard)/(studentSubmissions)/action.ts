import { supabase } from '@/lib/supabase/client';
import { student_submissions_view } from '@/types/submissonViews';

interface GetStudentSubmissionsResponse {
    data: student_submissions_view[] | null;
    error: Error | null;
}

export const getStudentSubmissions = async (): Promise<GetStudentSubmissionsResponse> => {
    const { data, error } = await supabase.from('student_submissions_view').select('*');

    if (error) {
        console.error(error.message);
        return { data: null, error };
    }

    return { data, error: null };
};
