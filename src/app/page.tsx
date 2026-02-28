'use client';

import { Separator } from '@/components';
import { EmptyLesson } from '@/components/emptyLesson/EmptyLesson';
import { LessonCard } from '@/components/lessonCard/LessonCard';
import { useEffect } from 'react';
import { loadLessons } from './api/lessons/route';
import { useLessonsStore } from './api/lessons/useLessonsStore';
import Link from 'next/link';

export default function Home() {
    const lessons = useLessonsStore((state) => state.lessons);

    useEffect(() => {
        loadLessons();
    }, []);

    return (
        <section>
            <h1>Main page</h1>

            {lessons?.length === 0 && <EmptyLesson />}

            {lessons?.length !== 0 && <Separator className="my-10" />}

            <div className="grid grid-cols-3 gap-4">
                {lessons?.map((lesson) => (
                    <Link href={`/dashboard/lesson/${lesson.id}`} key={lesson.id}>
                        <LessonCard
                            created_at={lesson.created_at}
                            description={lesson.description}
                            title={lesson.title}
                        />
                    </Link>
                ))}
            </div>

            {lessons?.length !== 0 && <Separator className="my-10" />}
        </section>
    );
}
