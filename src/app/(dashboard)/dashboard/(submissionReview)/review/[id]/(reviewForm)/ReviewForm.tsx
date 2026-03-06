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
    Textarea,
} from '@/components';
import { useState } from 'react';
import { gradeSubmittion } from './action';
import { redirect } from 'next/navigation';

export const ReviewForm = ({ id }: { id: string }) => {
    const [grade, setGrade] = useState('');
    const [feedback, setFeedback] = useState('');

    const submitHandler = async () => {
        const res = await gradeSubmittion(id, grade, feedback, 'graded');

        if (res.error) {
            console.error(res.error.message);
            alert(res.error.message);
        }
        if (res.data) {
            alert(
                `Submittted. grade: ${res.data.grade}, feedback: ${res.data.feedback}, graded at: ${res.data.graded_at}`,
            );
            redirect('/dashboard');
        }

        setGrade('');
        setFeedback('');
    };

    const rejectHandler = async () => {
        const res = await gradeSubmittion(id, null, feedback, 'rejected');

        if (res.error) {
            console.error(res.error.message);
            alert(res.error.message);
        }
        if (res.data) {
            alert(`Rejected. feedback: ${res.data.feedback}`);
            redirect('/dashboard');
        }

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
                            onChange={(e) => setFeedback(e.target.value.trim())}
                        />
                    </div>

                    <div className="flex h-12 gap-5 justify-between items-center">
                        <div className="flex-1">
                            <Label className="mb-2">Required feedback.</Label>
                            <Button
                                variant={'destructive'}
                                type="button"
                                disabled={feedback.trim() === ''}
                                onClick={rejectHandler}
                                className="w-full">
                                Reject review
                            </Button>
                        </div>
                        <Separator orientation="vertical" />
                        <div className="flex-1">
                            <Label className="mb-2">Required grade and feedback.</Label>
                            <Button
                                type="button"
                                disabled={grade.trim() === '' || feedback.trim() === ''}
                                onClick={submitHandler}
                                className="w-full">
                                Submit Review
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
