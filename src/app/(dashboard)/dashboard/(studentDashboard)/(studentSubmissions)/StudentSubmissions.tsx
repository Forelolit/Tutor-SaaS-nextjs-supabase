'use client';

import { useGetStudentSubmissions } from './action';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Separator, Spinner } from '@/components';
import { getCreatedAtSubDays } from '@/lib/helpers/getCreatedAtSubDays';
import { getSubmissionStatus } from '@/lib/helpers/getSubmissionStatus';

export const StudentSubmissions = () => {
    const { data: submissions, isLoading } = useGetStudentSubmissions();

    if (isLoading) <Spinner />;

    return (
        <div className="grid gap-4 w-full">
            <div className="mb-5">
                <div>
                    <h2>My submissions</h2>
                    <p>Recent task submissions and feedback</p>
                </div>

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
                ?.map((s) => {
                    const status = getSubmissionStatus(s.status ?? 'submitted');

                    return (
                        <Card key={s.id}>
                            <CardHeader className="flex flex-row items-start justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-lg">{s.task_title}</CardTitle>
                                    {s.task_description && <CardDescription>{s.task_description}</CardDescription>}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Badge variant={status.variant}>{status.label}</Badge>
                                    {s.grade && <Badge>{s.grade}</Badge>}
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <Separator />

                                {s.lesson_title && (
                                    <div className="grid">
                                        <span className="text-sm font-medium">From:</span>
                                        <span className="text-muted-foreground">{s.lesson_title}</span>
                                    </div>
                                )}

                                <Separator />

                                <div className="space-y-1">
                                    <span className="text-sm font-medium">Your answer</span>
                                    <div className="rounded-md border bg-muted/30 p-3 text-sm">{s.content}</div>
                                </div>

                                {s.feedback && (
                                    <>
                                        <Separator />

                                        <div className="space-y-1">
                                            <span className="text-sm font-medium">Teacher feedback</span>
                                            <div className="rounded-md border p-3 text-sm">{s.feedback}</div>
                                        </div>
                                    </>
                                )}

                                <Separator />

                                <div className="flex gap-10 text-xs text-muted-foreground">
                                    <span>Task created: {getCreatedAtSubDays(s.task_created_at)}</span>
                                    {s.graded_at && <span>Graded at: {getCreatedAtSubDays(s.graded_at)}</span>}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })
                .reverse()}
        </div>
    );
};
