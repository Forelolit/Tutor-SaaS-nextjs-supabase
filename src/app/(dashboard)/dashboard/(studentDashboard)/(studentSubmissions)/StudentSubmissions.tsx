'use client';

import { useEffect, useState } from 'react';
import { getStudentSubmissions } from './action';
import { student_submissions_view } from '@/types/submissonViews';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Separator } from '@/components';
import { getSubmissionStatus } from '@/lib/helpers/getSubmissionStatus';

export const StudentSubmissions = () => {
    const [submissoins, setSubmissions] = useState<student_submissions_view[]>([]);

    useEffect(() => {
        const asyncGetStudentSubmissions = async () => {
            const res = await getStudentSubmissions();

            if (res.error) {
                alert(res.error.message);
            }

            if (res.data) {
                setSubmissions(res.data);
            }
        };
        asyncGetStudentSubmissions();
    }, []);

    return (
        <div className="grid gap-4">
            <div className="mb-5">
                <div>
                    <h2>My submissions</h2>
                    <p>Recent task submissions and feedback</p>
                </div>

                <div className="flex gap-2">
                    <Badge variant={'secondary'}>
                        {submissoins.filter((s) => s.status === 'submitted').length} Submittions
                    </Badge>
                    <Badge variant={'destructive'}>
                        {submissoins.filter((s) => s.status === 'rejected').length} Rejected
                    </Badge>
                    <Badge variant={'default'}>{submissoins.filter((s) => s.status === 'graded').length} Graded</Badge>
                </div>
            </div>

            {submissoins.map((s) => {
                const status = getSubmissionStatus(s.status ?? 'submitted');

                return (
                    <Card key={s.id}>
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-lg">{s.task_title}</CardTitle>
                                <CardDescription>{s.lesson_title}</CardDescription>
                            </div>

                            <div className="flex items-center gap-2">
                                <Badge variant={status.variant}>{status.label}</Badge>
                                {s.grade && <Badge>{s.grade}</Badge>}
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Task description</p>
                                <p className="text-sm text-muted-foreground">{s.task_description}</p>
                            </div>

                            <Separator />

                            <div className="space-y-1">
                                <p className="text-sm font-medium">Your answer</p>
                                <div className="rounded-md border bg-muted/30 p-3 text-sm">{s.content}</div>
                            </div>

                            {s.feedback && (
                                <>
                                    <Separator />

                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Teacher feedback</p>
                                        <div className="rounded-md border p-3 text-sm">{s.feedback}</div>
                                    </div>
                                </>
                            )}

                            <Separator />

                            <div className="flex gap-10 text-xs text-muted-foreground">
                                <span>Task created: {s.task_created_at}</span>
                                {s.graded_at && <span>Graded at: {s.graded_at}</span>}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};
