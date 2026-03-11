import { LessonData } from '@/types/lessonData';
import { StudentSubmissions } from './(studentSubmissions)/StudentSubmissions';
import Link from 'next/link';
import { Badge, Card, CardContent, LessonCard, Spinner } from '@/components';
import { InviteCard } from '@/components/inviteCard/InviteCard';
import { acceptInvite, useGetInvites } from './action';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const StudentDashboard = ({ lessons }: { lessons: LessonData[] | null }) => {
    const { data: invites, isLoading: invitesLoading } = useGetInvites();

    const { mutate } = useMutation({
        mutationFn: acceptInvite,
        onSuccess: () => {
            toast.success('Invite accepted!');
        },
    });

    const acceptHandler = (token: string) => {
        mutate({ token });
    };

    const deleteHandler = (token: string) => {
        toast(token);
    };

    return (
        <div className="grid grid-cols-2 gap-10">
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

                {invitesLoading && <Spinner />}

                {!invitesLoading && invites?.length !== 0 && (
                    <div>
                        <h2>
                            You have {invites?.length} {invites?.length === 1 ? 'invite' : 'invites'} to a lesson
                        </h2>

                        <div className="grid grid-cols-2 gap-5">
                            {invites?.map((invite) => (
                                <InviteCard
                                    key={invite.invite_id}
                                    className="transition-transform hover:scale-[1.02]"
                                    invite={invite}
                                    acceptInvite={() => acceptHandler(invite.token ?? '')}
                                    deleteInvite={() => deleteHandler(invite.token ?? '')}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <StudentSubmissions />
        </div>
    );
};
