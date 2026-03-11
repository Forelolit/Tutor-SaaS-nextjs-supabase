'use client';

import { use } from 'react';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Separator, Spinner } from '@/components';
import { ReviewForm } from './(reviewForm)/ReviewForm';
import { useGetTeacherSubmissionById } from './action';
import { getCreatedAtSubDays } from '@/lib/helpers/getCreatedAtSubDays';

const ReviewPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const { data: submission, isLoading } = useGetTeacherSubmissionById(id);

    if (isLoading) <Spinner />;

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
                        <h4>Student</h4>

                        <p>
                            First name:
                            <span className="text-muted-foreground">{` ${submission?.student_first_name}`}</span>
                        </p>

                        {submission?.student_last_name && (
                            <p>
                                Last name:
                                <span className="text-muted-foreground">{` ${submission?.student_last_name}`}</span>
                            </p>
                        )}

                        <p>
                            Submitted:
                            <span className="text-muted-foreground">{` ${getCreatedAtSubDays(
                                submission?.submitted_at ?? '',
                            )}`}</span>
                        </p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <h4>Task</h4>

                        <p>
                            Title:
                            <span className="text-muted-foreground">{` ${submission?.task_title}`}</span>
                        </p>

                        <p>
                            Description:
                            <span className="text-muted-foreground">{` ${submission?.task_description}`}</span>
                        </p>

                        <p>
                            Created:
                            <span className="text-muted-foreground">
                                {` ${getCreatedAtSubDays(submission?.task_created_at ?? '')}`}
                            </span>
                        </p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <h3>Student Answer</h3>

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
