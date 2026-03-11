import { supabase } from '@/lib/supabase/client';
import { useLessonsStore } from '@/stores/lessons/useLessonsStore';

export const initLessonsListener = async () => {
    await fetchAndStoreLessons();
};

export const refreshLessons = async () => {
    await fetchAndStoreLessons();
    console.log('Force refresh lessons');
};

const fetchAndStoreLessons = async () => {
    const { data, error } = await supabase.from('lessons').select('*');

    if (error) {
        console.error('Lessons error:', error.message);
        return;
    }

    if (!data) {
        console.error('Lessons data is null');
        return;
    }

    useLessonsStore.getState().setLessons(data);
};
