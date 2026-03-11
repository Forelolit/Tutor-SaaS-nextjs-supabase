import { dbQuery } from '@/lib/helpers/dbQuery';
import { supabase } from '@/lib/supabase/client';
import { teacher_submissions_view } from '@/types/submissonViews';
import { useQuery } from '@tanstack/react-query';

export const getTeacherSubmissionById = async (id: string): Promise<teacher_submissions_view> => {
    return dbQuery(supabase.from('teacher_submissions_view').select('*').eq('id', id).single());
};

export const useGetTeacherSubmissionById = (id: string) => {
    return useQuery({
        queryKey: ['teacher_submission_by_id', id],
        queryFn: () => getTeacherSubmissionById(id),
    });
};
