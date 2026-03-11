import { dbQuery } from '@/lib/helpers/dbQuery';
import { supabase } from '@/lib/supabase/client';
import { teacher_submissions_view } from '@/types/submissonViews';
import { useQuery } from '@tanstack/react-query';

export const getTeacherSubmissions = async (): Promise<teacher_submissions_view[]> => {
    return dbQuery(supabase.from('teacher_submissions_view').select('*'));
};

export const useGetTeacherSubmissions = () => {
    return useQuery({
        queryKey: ['teacher_submissions'],
        queryFn: getTeacherSubmissions,
    });
};
