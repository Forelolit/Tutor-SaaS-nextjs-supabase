import { dbQuery } from '@/lib/helpers/dbQuery';
import { supabase } from '@/lib/supabase/client';
import { TaskData } from '@/types/taskData';

export const createTask = async ({
    lessonId,
    title,
    description,
}: {
    lessonId: string;
    title: string;
    description?: string;
}): Promise<TaskData> => {
    return dbQuery(
        supabase
            .from('tasks')
            .insert({
                title,
                description,
                lesson_id: lessonId,
            })
            .select()
            .single(),
    );
};
