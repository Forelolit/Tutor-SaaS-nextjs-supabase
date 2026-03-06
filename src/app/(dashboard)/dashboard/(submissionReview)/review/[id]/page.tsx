'use client';

import { use, useEffect, useState } from 'react';
import { getStudentSubmissionById } from './action';
import { teacher_submissions_view } from '@/types/submissonViews';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Separator } from '@/components';
import { ReviewForm } from './(reviewForm)/ReviewForm';

const ReviewPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const [submission, setSubmission] = useState<teacher_submissions_view>();

    useEffect(() => {
        const asyncGetStudentSubmissionById = async () => {
            const res = await getStudentSubmissionById(id);

            if (res.error) {
                console.error(res.error.message);
                alert(res.error.message);
            }

            if (res.data) {
                setSubmission(res.data);
            }
        };
        asyncGetStudentSubmissionById();
    }, [id]);

    return (
        <div className="flex flex-col items-center justify-center gap-5 p-6">
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Submission</CardTitle>
                        <Badge variant={'secondary'}>
                            {submission?.status === 'submitted' ? 'Need review' : submission?.status}
                        </Badge>
                    </div>
                    <CardDescription>Student task submission details</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-muted-foreground">Student</h3>

                        <div className="flex gap-2 text-base font-medium">
                            <span>First name: {submission?.student_first_name}</span>
                            {submission?.student_last_name && <span>Last name: {submission?.student_last_name}</span>}
                        </div>

                        <p className="text-sm text-muted-foreground">Submitted at: {submission?.submitted_at}</p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-muted-foreground">Task</h3>

                        <p className="text-lg font-semibold">{submission?.task_title}</p>

                        <p className="text-sm text-muted-foreground">Created at: {submission?.task_created_at}</p>

                        <p className="text-sm leading-relaxed">{submission?.task_description}</p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-muted-foreground">Student Answer</h3>

                        <div className="rounded-md border bg-muted/30 p-4 text-sm leading-relaxed">
                            {submission?.content}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <ReviewForm id={id} />
        </div>
    );
};

export default ReviewPage;
