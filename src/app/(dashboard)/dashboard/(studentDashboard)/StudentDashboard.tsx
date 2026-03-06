import { LessonData } from '@/types/lessonData';
import { StudentSubmissions } from './(studentSubmissions)/StudentSubmissions';
import Link from 'next/link';
import { Badge, Card, CardContent, LessonCard } from '@/components';
import { useInvitesStore } from '@/stores/invites/useInvitesStore';
import { InviteCard } from '@/components/inviteCard/InviteCard';

export const StudentDashboard = ({ lessons }: { lessons: LessonData[] | null }) => {
    const invites = useInvitesStore((state) => state.invites);

    return (
        <div className="grid grid-cols-[1fr_auto] gap-10">
            <div>
                <div className="mb-5">
                    <div>
                        <h2>My lessons</h2>
                        <p>Track your lessons and submissions</p>
                    </div>

                    {lessons && lessons.length > 0 && <Badge variant="secondary">{lessons.length} lessons</Badge>}
                </div>

                {lessons && lessons.length > 0 && (
                    <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
                        {lessons.map((lesson) => (
                            <Link
                                href={`/dashboard/lesson/${lesson.id}`}
                                key={lesson.id}
                                className="transition-transform hover:scale-[1.02]">
                                <LessonCard
                                    title={lesson.title}
                                    description={lesson.description}
                                    created_at={lesson.created_at}
                                />
                            </Link>
                        ))}
                    </div>
                )}

                {lessons?.length === 0 && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-10 text-center space-y-2">
                            <p>Your dashboard is empty</p>
                            <p>Once a teacher invites you to a lesson it will appear here.</p>
                        </CardContent>
                    </Card>
                )}

                {invites?.length !== 0 && (
                    <div>
                        <h2 className="text-center">
                            You have {invites?.length} {invites?.length === 1 ? 'invite' : 'invites'} to a lesson
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
            </div>

            <StudentSubmissions />
        </div>
    );
};
