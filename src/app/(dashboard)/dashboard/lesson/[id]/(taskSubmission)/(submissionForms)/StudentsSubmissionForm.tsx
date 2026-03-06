'use client';

import { Button, Input, Label } from '@/components';
import { useState } from 'react';
import { createSubmission } from './action';

interface StudentsSubmissionFormProps {
    taskId: string;
}

export const StudentsSubmissionForm = ({ taskId }: StudentsSubmissionFormProps) => {
    const [answer, setAnswer] = useState('');

    const sendAnswerHandler = async () => {
        const res = await createSubmission(taskId, answer);

        if (res.error) {
            alert(`Answer error: ${res.error.message}`);
        }
        if (res.data) {
            alert('Your answer submitted!');
        }

        setAnswer('');
    };

    return (
        <form className="grid gap-2 border p-2 w-full max-w-100 rounded-2xl">
            <Label className="grid">
                Answer required
                <Input
                    name="task_answer"
                    placeholder="Your answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
            </Label>
            <Button type="button" disabled={answer.trim() === ''} onClick={sendAnswerHandler}>
                Submit answer
            </Button>
        </form>
    );
};
