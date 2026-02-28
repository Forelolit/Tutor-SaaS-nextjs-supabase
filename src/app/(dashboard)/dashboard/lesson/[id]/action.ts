import { supabase } from '@/lib/supabase/client';
import { LessonData } from '@/types/lessonData';

interface GetLessonsResponseById {
    data: LessonData | null;
    error: Error | null;
}

export const getLessonById = async (lessonId: string): Promise<GetLessonsResponseById> => {
    const { data, error } = await supabase.from('lessons').select('*').eq('id', lessonId).single();
    if (error) {
        console.error(error);
    }

    if (data === null || undefined) {
        console.error('Data not provided', error?.message);
    }

    return { data, error };
};
