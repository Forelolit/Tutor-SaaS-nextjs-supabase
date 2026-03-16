import { dbQuery } from '@/lib/helpers/dbQuery';
import { supabase } from '@/lib/supabase/client';
import { LessonDataWithTaskData } from '@/types/lessonDataWithTasksData';
import { LessonStudentsData } from '@/types/lessonStudentsData';
import { useQuery } from '@tanstack/react-query';

export const getLessonWithTasks = async (lessonId: string): Promise<LessonDataWithTaskData> => {
    return dbQuery(
        supabase
            .from('lessons')
            .select(
                `
        *,
        tasks (*)
        `,
            )
            .eq('id', lessonId)
            .single(),
    );
};

export const useGetLessonWithTasks = (lessonId: string) => {
    return useQuery({
        queryKey: ['lesson_detail', lessonId],
        queryFn: () => getLessonWithTasks(lessonId),
    });
};

interface studentData {
    id: string;
    first_name: string;
    last_name: string;
}

export const getLessonStudents = async (lesson_id: string): Promise<studentData[]> => {
    const lessonStudents = await dbQuery(supabase.from('lesson_students').select('*').eq('lesson_id', lesson_id));

    const usersPromises = lessonStudents.map(async (data: LessonStudentsData) => {
        const res = await dbQuery<studentData>(
            supabase.from('profiles').select('id, first_name, last_name').eq('id', data.student_id).single(),
        );
        return res;
    });

    const users = await Promise.all<studentData>(usersPromises);

    return users.filter((user): user is studentData => user !== null);
};

export const useGetLessonStudents = (lesson_id: string) => {
    return useQuery({
        queryKey: ['lesson_students', lesson_id],
        queryFn: async () => {
            try {
                return await getLessonStudents(lesson_id);
            } catch (error) {
                return null;
            }
        },
    });
};
