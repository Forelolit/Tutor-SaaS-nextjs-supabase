import { supabase } from '@/lib/supabase/client';
import { LessonDataWithTaskData } from '@/types/lessonDataWithTasksData';
import { TaskData } from '@/types/taskData';

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

interface CreateTaskResponse {
    data: TaskData;
    error: Error | null;
}

export const createTask = async (
    lessonId: string,
    title: string,
    description?: string,
): Promise<CreateTaskResponse> => {
    const { data, error } = await supabase
        .from('tasks')
        .insert({
            title,
            description,
            lesson_id: lessonId,
        })
        .select()
        .single();

    if (error) throw error.message;

    return { data, error };
};
