import { supabase } from '@/lib/supabase/client';
import { LessonDataWithTaskData } from '@/types/lessonDataWithTasksData';
import { LessonStudentsData } from '@/types/lessonStudentsData';
import { UserData } from '@/types/userData';

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

export interface GetLessonStudentsResponse {
    data: LessonStudentsData[] | null;
    error: Error | null;
}

export const getLessonStudents = async (lesson_id: string): Promise<UserData[] | null> => {
    const { data: lessonStudents, error } = await supabase
        .from('lesson_students')
        .select('*')
        .eq('lesson_id', lesson_id);

    if (error) {
        console.error(error.message);
        return null;
    }

    if (!lessonStudents || lessonStudents.length === 0) return [];

    const usersPromises = lessonStudents.map(async ({ student_id }) => {
        const { data, error } = await supabase.from('profiles').select('*').eq('id', student_id).single();

        if (error) {
            console.error(error.message);
            return null;
        }
        return data;
    });

    const users = await Promise.all(usersPromises);

    return users.filter((user: UserData) => user !== null);
};
