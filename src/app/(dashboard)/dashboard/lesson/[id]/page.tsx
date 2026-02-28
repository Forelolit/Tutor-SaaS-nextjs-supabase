'use client';

import { use, useEffect, useState } from 'react';
import { getLessonWithTasks } from './action';
import CreateTaskForm from './createTaskForm';
import { Spinner } from '@/components';
import { LessonDataWithTaskData } from '@/types/lessonDataWithTasksData';

const LessonDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const [lesson, setLesson] = useState<LessonDataWithTaskData>();
    const [loadingLesson, setLoadingLesson] = useState(false);

    useEffect(() => {
        const asyncGetLessonWithTasks = async () => {
            setLoadingLesson(true);
            const res = await getLessonWithTasks(id);

            setLesson(res.data ?? undefined);
            setLoadingLesson(false);
        };

        asyncGetLessonWithTasks();
    }, [id]);

    return (
        <>
            <h1>Lesson detail page</h1>
            {loadingLesson && <Spinner />}
            {lesson && !loadingLesson && (
                <ul>
                    <li>{lesson?.title}</li>
                    <li>{lesson?.description}</li>
                    <li>{lesson?.created_at}</li>
                </ul>
            )}

            <CreateTaskForm lessonId={lesson?.id} />

            {loadingLesson && <Spinner />}
            {lesson &&
                !loadingLesson &&
                lesson.tasks.map((task) => (
                    <ul key={task.id}>
                        <li>{task.title}</li>
                        <li>{task.description}</li>
                        <li>{task.created_at}</li>
                    </ul>
                ))}
        </>
    );
};

export default LessonDetail;
