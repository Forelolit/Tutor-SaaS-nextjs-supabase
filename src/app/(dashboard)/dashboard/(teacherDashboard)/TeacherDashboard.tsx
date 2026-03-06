import { Badge, Button, Card, CardContent, LessonCard } from '@/components';
import Link from 'next/link';
import { LessonData } from '@/types/lessonData';
import { ReviewPanel } from '../(submissionReview)/ReviewPanel';

export const TeacherDashboard = ({ lessons }: { lessons: LessonData[] | null }) => {
    return (
        <div className="grid grid-cols-[1fr_auto] gap-10">
            <div>
                <div className="mb-5">
                    <div className="flex items-center gap-5">
                        <h2>My lessons</h2>
                        <Link href={'createDashboardLesson'}>
                            <Button>Create lesson</Button>
                        </Link>
                    </div>

                    {lessons && lessons.length > 0 && <Badge variant="secondary">{lessons.length} lessons</Badge>}
                </div>

                {lessons?.length !== 0 && (
                    <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
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

                {lessons?.length === 0 && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-10 text-center space-y-2">
                            <p>Your dashboard is empty</p>
                            <p>Create a lesson it will appear here.</p>
                        </CardContent>
                    </Card>
                )}
            </div>

            <ReviewPanel />
        </div>
    );
};
