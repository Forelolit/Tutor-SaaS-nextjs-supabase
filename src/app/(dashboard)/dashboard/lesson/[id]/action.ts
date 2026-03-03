import { supabase } from '@/lib/supabase/client';
import { LessonDataWithTaskData } from '@/types/lessonDataWithTasksData';

export interface GetLessonsByIdWithTasks {
    data: LessonDataWithTaskData | null;
    error: Error | null;
}

export const getLessonWithTasks = async (lessonId: string): Promise<GetLessonsByIdWithTasks> => {
    const { data, error } = await supabase
        .from('lessons')
        .select(
            `
        *,
        tasks (*)
        `,
        )
        .eq('id', lessonId)
        .single();

    if (error) throw error.message;

    return { data, error };
};
