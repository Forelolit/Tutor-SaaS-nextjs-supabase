'use client';

import { useState } from 'react';
import { Button, Input, Label, Spinner } from '@/components';
import { createTask } from './action';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const CreateTaskForm = ({ lessonId }: { lessonId: string }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { mutate, isPending } = useMutation({
        mutationKey: ['tasks', lessonId],
        mutationFn: createTask,
        onSuccess: () => {
            toast.success('Task created!');
        },
    });

    const createHandler = () => {
        mutate({ lessonId, title, description });

        setTitle('');
        setDescription('');
    };

    return (
        <form className="w-full grid gap-2">
            <Label>Title is required</Label>
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Label>Description is optional</Label>
            <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Button type="button" disabled={title.trim() === '' || isPending} onClick={createHandler}>
                {isPending ? <Spinner /> : 'Create task'}
            </Button>
        </form>
    );
};
