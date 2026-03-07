import { dbQuery } from '@/lib/helpers/dbQuery';
import { getCurrentUser } from '@/lib/helpers/getCurrentUser';
import { supabase } from '@/lib/supabase/client';
import { LessonData } from '@/types/lessonData';
import { LessonDataCreate } from '@/types/lessonDataCreate';

interface CreateLessonResponse {
    data: LessonData[] | null;
    error: Error | null;
}

export const createLesson = async (lessonData: LessonDataCreate): Promise<CreateLessonResponse> => {
    const user = await getCurrentUser();
    return dbQuery(
        supabase
            .from('lessons')
            .insert([
                {
                    title: lessonData.title,
                    description: lessonData.description,
                    owner_id: user.id,
                },
            ])
            .select(),
    );
};
