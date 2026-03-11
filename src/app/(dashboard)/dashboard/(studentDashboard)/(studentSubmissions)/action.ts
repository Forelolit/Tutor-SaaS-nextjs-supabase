import { dbQuery } from '@/lib/helpers/dbQuery';
import { supabase } from '@/lib/supabase/client';
import { student_submissions_view } from '@/types/submissonViews';
import { useQuery } from '@tanstack/react-query';

export const getStudentSubmissions = async (): Promise<student_submissions_view[]> => {
    return dbQuery(supabase.from('student_submissions_view').select('*'));
};

export const useGetStudentSubmissions = () => {
    return useQuery({
        queryKey: ['student_submissions'],
        queryFn: getStudentSubmissions,
    });
};
