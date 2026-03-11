'use client';

import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Separator,
    Spinner,
    Textarea,
} from '@/components';
import { useState } from 'react';
import { gradeSubmittion } from './action';
import { redirect } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const ReviewForm = ({ id }: { id: string }) => {
    const [grade, setGrade] = useState('');
    const [feedback, setFeedback] = useState('');

    const { mutate, isPending } = useMutation({
        mutationFn: gradeSubmittion,
        onSuccess: (data) => {
            if (data.status === 'graded') {
                toast.success('Graded!');
                redirect('/dashboard');
            }
            if (data.status === 'rejected') {
                toast.success(`Rejected!`);
                redirect('/dashboard');
            }
        },
    });

    const submitHandler = async () => {
        mutate({ id, grade, feedback, status: 'graded' });

        setGrade('');
        setFeedback('');
    };

    const rejectHandler = async () => {
        mutate({ id, grade: null, feedback, status: 'rejected' });

        setGrade('');
        setFeedback('');
    };

    return (
        <Card className="w-full max-w-3xl">
            <CardHeader>
                <CardTitle>Review Submission</CardTitle>
                <CardDescription>Leave a grade and feedback for the student</CardDescription>
            </CardHeader>

            <CardContent>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="grade">Grade. Must me from 0 to 100</Label>
                        <Input
                            id="grade"
                            placeholder="Enter grade"
                            type="number"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value.trim())}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="feedback">Feedback</Label>
                        <Textarea
                            id="feedback"
                            placeholder="Write feedback for the student"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                    </div>

                    <div className="flex h-12 gap-5 justify-between items-center">
                        <div className="flex-1">
                            <Label className="mb-2">Required feedback.</Label>
                            <Button
                                variant={'destructive'}
                                type="button"
                                disabled={feedback.trim() === '' || isPending}
                                onClick={rejectHandler}
                                className="w-full">
                                {isPending ? <Spinner /> : 'Reject review'}
                            </Button>
                        </div>

                        <Separator orientation="vertical" />

                        <div className="flex-1">
                            <Label className="mb-2">Required grade and feedback.</Label>
                            <Button
                                type="button"
                                disabled={grade.trim() === '' || feedback.trim() === '' || isPending}
                                onClick={submitHandler}
                                className="w-full">
                                {isPending ? <Spinner /> : 'Submit Review'}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
