import { supabase } from '@/lib/supabase/client';
import { LessonData } from '@/types/lessonData';

interface GetLessonsResponse {
    data: LessonData[] | null;
    error: Error | null;
}

export const getLessons = async (): Promise<GetLessonsResponse> => {
    const { data, error } = await supabase.from('lessons').select('*');

    if (error) {
        console.error('Select error:', error.message);
    }

    return { data, error };
};
