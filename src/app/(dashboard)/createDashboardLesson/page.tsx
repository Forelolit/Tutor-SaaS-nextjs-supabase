'use client';

import { Button, Input, Label, Spinner } from '@/components';
import { useState } from 'react';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { createLesson } from './actions';

const CreateDashboardLesson = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { mutate, isPending } = useMutation({
        mutationFn: createLesson,
        onSuccess: () => {
            toast.info('Lesson created!');
        },
    });

    const createHandler = () => {
        mutate({
            title,
            description,
        });
        setTitle('');
        setDescription('');
    };

    return (
        <div className="flex flex-col gap-2 justify-center items-center h-[80vh]">
            <h1>Create your lesson</h1>
            <form className="flex flex-col gap-2 w-full max-w-125 border border-neutral-800 p-8 rounded-2xl overflow-hidden">
                <Input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Label>Description is optional</Label>
                <Input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <Button type="button" onClick={createHandler} disabled={title.trim() === '' || isPending}>
                    {isPending ? <Spinner /> : 'Create lesson'}
                </Button>
            </form>
        </div>
    );
};

export default CreateDashboardLesson;
