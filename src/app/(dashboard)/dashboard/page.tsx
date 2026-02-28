'use client';

import { LessonCard } from '@/components';
import { useEffect, useState } from 'react';
import { getLessons } from './actions';
import { LessonData } from '@/types/lessonData';
import Loading from './loading';
import Link from 'next/link';

const DashboardPage = () => {
    const [lessonsArr, setLessonsArr] = useState<LessonData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const asyncSelectLessons = async () => {
            setLoading(true);
            const res = await getLessons();

            if (res.error) {
                console.error(res.error.message);
                return res.error.message;
            }

            setLoading(false);
            setLessonsArr(res.data ?? []);
        };
        asyncSelectLessons();
    }, []);

    return (
        <div className="mt-10 p-5 grid gap-4 border border-neutral-800 rounded-2xl w-screen max-w-2xl justify-self-center">
            <h1 className="text-2xl mb-2">Dashboard</h1>

            {lessonsArr.map((lesson) => (
                <Link href={`/dashboard/lesson/${lesson.id}`} key={lesson.id}>
                    <LessonCard title={lesson.title} description={lesson.description} created_at={lesson.created_at} />
                </Link>
            ))}

            {!lessonsArr.length && !loading && <p>Your Dashboard is empty</p>}
            {!lessonsArr.length && loading && <Loading />}
        </div>
    );
};

export default DashboardPage;
