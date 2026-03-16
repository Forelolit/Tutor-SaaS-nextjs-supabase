import { dbQuery } from '@/lib/helpers/dbQuery';
import { getCurrentUser } from '@/lib/helpers/getCurrentUser';
import { supabase } from '@/lib/supabase/client';
import { LessonData } from '@/types/lessonData';

export const createLesson = async ({
    title,
    description,
}: {
    title: string;
    description: string;
}): Promise<LessonData> => {
    const user = await getCurrentUser();
    
    return dbQuery(
        supabase
            .from('lessons')
            .insert({
                title: title,
                description: description,
                owner_id: user.id,
            })
            .select()
            .single(),
    );
};
