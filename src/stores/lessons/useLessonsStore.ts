import { LessonData } from '@/types/lessonData';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LessonsStore {
    lessons: LessonData[] | null;
    setLessons: (lessons: LessonData[]) => void;
    clearLessons: () => void;
}

export const useLessonsStore = create<LessonsStore>()(
    persist(
        (set) => ({
            lessons: [],
            setLessons: (lessons) => set({ lessons }),
            clearLessons: () =>
                set({
                    lessons: null,
                }),
        }),
        { name: 'tutor_saas_lessons' },
    ),
);
