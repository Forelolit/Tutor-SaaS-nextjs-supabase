import { supabase } from '@/lib/supabase/client';
import { LessonData } from '@/types/lessonData';

type LessonDataArgs = Pick<LessonData, 'title' | 'description' | 'owner_id'>;

interface SelectLessonsResponse {
    data: LessonData[] | null;
    error: Error | null;
}

export const createLesson = async (lessonData: LessonDataArgs): Promise<SelectLessonsResponse> => {
    const { data, error } = await supabase
        .from('lessons')
        .insert([
            {
                title: lessonData.title,
                description: lessonData.description,
                owner_id: lessonData.owner_id,
            },
        ])
        .select();

    if (error) {
        console.error('Insert error:', error.message);
    }

    if (data) {
        alert('Lesson created!');
    }

    return { data, error };
};
