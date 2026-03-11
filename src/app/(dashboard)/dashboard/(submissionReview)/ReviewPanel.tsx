'use client';

import Link from 'next/link';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Spinner } from '@/components';
import { useGetTeacherSubmissions } from './action';
import { getSubmissionStatus } from '@/lib/helpers/getSubmissionStatus';
import { getCreatedAtSubDays } from '@/lib/helpers/getCreatedAtSubDays';

export const ReviewPanel = () => {
    const { data: submissions, isLoading } = useGetTeacherSubmissions();

    if (isLoading) <Spinner />;

    return (
        <div className="grid gap-4">
            <div>
                <h2>Reviews</h2>

                <div className="flex gap-2">
                    <Badge variant={'secondary'}>
                        {submissions?.filter((s) => s.status === 'submitted').length} Submittions
                    </Badge>
                    <Badge variant={'destructive'}>
                        {submissions?.filter((s) => s.status === 'rejected').length} Rejected
                    </Badge>
                    <Badge variant={'default'}>{submissions?.filter((s) => s.status === 'graded').length} Graded</Badge>
                </div>
            </div>

            {submissions
                ?.slice()
                .reverse()
                .map((s) => {
                    const status = getSubmissionStatus(s.status ?? 'submitted');

                    return (
                        <Card key={s.id}>
                            <CardHeader className="flex flex-row items-start justify-between">
                                <div>
                                    <CardTitle className="text-lg">{s.task_title}</CardTitle>
                                    <CardDescription>
                                        {s.task_description === '' ? 'Description not set' : s.task_description}
                                    </CardDescription>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Badge variant={status.variant}>{status.label}</Badge>
                                    {s.grade && <Badge>{s.grade}</Badge>}
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div>
                                    <span className="font-medium">
                                        From:
                                        <span className="text-muted-foreground font-normal">{` ${s.lesson_title}`}</span>
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-6 text-sm">
                                    <span className="font-medium">
                                        Student:
                                        <span className="text-muted-foreground font-normal">
                                            {` ${s.student_first_name} ${
                                                s.student_last_name ? s.student_last_name : ''
                                            }`}
                                        </span>
                                    </span>

                                    <span>
                                        <span className="font-medium">
                                            Submitted:
                                            <span className="text-muted-foreground font-normal">
                                                {` ${getCreatedAtSubDays(s.submitted_at)}`}
                                            </span>
                                        </span>
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Answer</p>

                                    <div className="rounded-md border bg-muted/30 p-3 text-sm">{s.content}</div>
                                </div>

                                {s.feedback && (
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium">Feedback</p>

                                        <div className="rounded-md border bg-muted/30 p-3 text-sm">{s.feedback}</div>
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    {s.status === 'submitted' && (
                                        <Link href={`/dashboard/review/${s.id}`}>
                                            <Button>Review submission</Button>
                                        </Link>
                                    )}
                                    {s.status === 'graded' && (
                                        <span className="text-sm font-medium">
                                            Graded:
                                            <span className="text-muted-foreground">
                                                {` ${getCreatedAtSubDays(s.graded_at)}`}
                                            </span>
                                        </span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
        </div>
    );
};
