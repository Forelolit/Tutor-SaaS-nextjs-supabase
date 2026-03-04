'use client';

import { EmptyLesson, LessonCard, Separator } from '@/components/index';
import { useLessonsStore, useUserStore } from '@/stores/index';
import Link from 'next/link';
import { useInvitesStore } from '@/stores/invites/useInvitesStore';
import { InviteCard } from '@/components/inviteCard/InviteCard';

export default function Home() {
    const lessons = useLessonsStore((state) => state.lessons);
    const isAuth = useUserStore((state) => state.isAuth);
    const role = useUserStore((state) => state.user?.role);
    const invites = useInvitesStore((state) => state.invites);

    return (
        <section>
            <h1>Main page</h1>

            {isAuth && role === 'teacher' && lessons?.length === 0 && <EmptyLesson />}

            {isAuth && role === 'student' && lessons?.length === 0 && invites?.length === 0 && (
                <div>
                    <h2 className="text-center">You need to get an invite to the lesson first</h2>
                </div>
            )}

            {isAuth && role === 'student' && invites?.length && (
                <div>
                    <h2 className="text-center">
                        You have {invites.length} {invites.length <= 1 ? 'invite' : 'invites'} to a lesson
                    </h2>

                    <div className="grid grid-cols-4 gap-5">
                        {invites?.map((invite) => (
                            <Link href={'/profile/invites'} key={invite.id}>
                                <InviteCard key={invite.id} invite={invite} />
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {!isAuth && (
                <div className="text-center">
                    <h2>Sign in to use the app</h2>
                </div>
            )}

            {isAuth && lessons?.length !== 0 && <Separator className="my-10" />}

            {isAuth && (
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
            )}

            {isAuth && lessons?.length !== 0 && <Separator className="my-10" />}
        </section>
    );
}
