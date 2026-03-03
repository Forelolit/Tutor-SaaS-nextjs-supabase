import { supabase } from '@/lib/supabase/client';
import { TaskData } from '@/types/taskData';

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
