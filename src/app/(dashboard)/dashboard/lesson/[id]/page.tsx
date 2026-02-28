'use client';

import { use, useEffect, useState } from 'react';
import { LessonData } from '@/types/lessonData';
import { getLessonById } from './action';

const LessonDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const [lesson, setLesson] = useState<LessonData>();

    useEffect(() => {
        const asyncFetch = async () => {
            const res = await getLessonById(id);

            if (res.error) {
                console.error(res.error.message);
            }

            setLesson(res.data ?? undefined);
        };

        asyncFetch();
    }, [id]);

    return (
        <>
            <h1>Lesson detail page</h1>

            <ul>
                <li>{lesson?.title}</li>
                <li>{lesson?.description}</li>
                <li>{lesson?.created_at}</li>
            </ul>
        </>
    );
};

export default LessonDetail;
