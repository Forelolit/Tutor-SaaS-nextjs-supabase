'use client';

import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components';
import { getStudentSubmission } from './action';
import Link from 'next/link';
import { teacher_submissions_view } from '@/types/submissonViews';
import { getSubmissionStatus } from '@/lib/helpers/getSubmissionStatus';

export const ReviewPanel = () => {
    const [submisson, setSubmission] = useState<teacher_submissions_view[]>([]);

    useEffect(() => {
        const asyncGetStudentSubmission = async () => {
            const res = await getStudentSubmission();

            if (res.error) {
                alert(res.error.message);
            }
            if (res.data) {
                setSubmission(res.data);
            }
        };
        asyncGetStudentSubmission();
    }, []);

    return (
        <div className="grid gap-4">
            <div>
                <h2>Reviews</h2>

                <div className="flex gap-2">
                    <Badge variant={'secondary'}>
                        {submisson.filter((s) => s.status === 'submitted').length} Submittions
                    </Badge>
                    <Badge variant={'destructive'}>
                        {submisson.filter((s) => s.status === 'rejected').length} Rejected
                    </Badge>
                    <Badge variant={'default'}>{submisson.filter((s) => s.status === 'graded').length} Graded</Badge>
                </div>
            </div>

            {submisson
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

                                <Badge variant={status.variant}>{status.label}</Badge>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                                    <span>
                                        <span className="font-medium text-foreground">Student:</span>{' '}
                                        {s.student_first_name} {s.student_last_name}
                                    </span>

                                    <span>
                                        <span className="font-medium text-foreground">Submitted:</span> {s.submitted_at}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Answer</p>

                                    <div className="rounded-md border bg-muted/30 p-3 text-sm">{s.content}</div>
                                </div>

                                <div className="flex justify-end">
                                    <Link href={s.status !== 'submitted' ? '#' : `/dashboard/review/${s.id}`}>
                                        <Button disabled={s.status !== 'submitted'}>Review submission</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
        </div>
    );
};
