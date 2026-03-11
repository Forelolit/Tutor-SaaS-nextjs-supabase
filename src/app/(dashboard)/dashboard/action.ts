import { dbQuery } from '@/lib/helpers/dbQuery';
import { supabase } from '@/lib/supabase/client';
import { LessonData } from '@/types/lessonData';
import { useQuery } from '@tanstack/react-query';

const getLessons = (): Promise<LessonData[]> => {
    return dbQuery(supabase.from('lessons').select('*'));
};

export const useGetLessons = () => {
    return useQuery({
        queryKey: ['lessons'],
        queryFn: getLessons,
    });
};
