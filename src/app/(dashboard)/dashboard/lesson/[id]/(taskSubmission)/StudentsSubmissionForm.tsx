'use client';

import { Button, Input, Label, Spinner } from '@/components';
import { useState } from 'react';
import { createSubmission } from './action';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface StudentsSubmissionFormProps {
    taskId: string;
}

export const StudentsSubmissionForm = ({ taskId }: StudentsSubmissionFormProps) => {
    const [answer, setAnswer] = useState('');
    const { mutate, isPending } = useMutation({
        mutationFn: createSubmission,
        onSuccess: () => {
            toast.success('Your task submitted');
        },
    });

    const sendAnswerHandler = () => {
        mutate({ taskId, answer });
        setAnswer('');
    };

    return (
        <form className="grid gap-2 w-full">
            <Label>Answer required</Label>
            <Input
                name="task_answer"
                placeholder="Your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <Button type="button" disabled={answer.trim() === '' || isPending} onClick={sendAnswerHandler}>
                {isPending ? <Spinner /> : 'Submit answer'}
            </Button>
        </form>
    );
};
