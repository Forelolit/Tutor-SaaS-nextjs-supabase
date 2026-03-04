'use client';

import { Button, LessonCard } from '@/components';
import Link from 'next/link';
import { useLessonsStore } from '@/stores/lessons/useLessonsStore';
import { useUserStore } from '@/stores';

const DashboardPage = () => {
    const lessons = useLessonsStore((state) => state.lessons);
    const isAuth = useUserStore((state) => state.isAuth);

    return (
        <div className="mt-10 p-5 grid gap-4 border border-neutral-800 rounded-2xl">
            <div className="flex gap-10 items-center">
                <h1 className="text-2xl mb-2">Dashboard</h1>
                <Link href={'createDashboardLesson'}>
                    <Button>Create lesson</Button>
                </Link>
                <Link href={'dashboard/inviteStudent'}>
                    <Button variant={'outline'}>Invite student</Button>
                </Link>
            </div>

            {lessons?.length !== 0 && <h2>My lessons:</h2>}

            {isAuth && (
                <div className="grid grid-cols-3 gap-4">
                    {lessons?.map((lesson) => (
                        <Link href={`/dashboard/lesson/${lesson.id}`} key={lesson.id}>
                            <LessonCard
                                title={lesson.title}
                                description={lesson.description}
                                created_at={lesson.created_at}
                            />
                        </Link>
                    ))}
                </div>
            )}

            {lessons?.length === 0 && <p>Your Dashboard is empty</p>}
        </div>
    );
};

export default DashboardPage;
