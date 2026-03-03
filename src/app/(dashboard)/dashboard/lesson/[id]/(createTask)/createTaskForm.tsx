'use client';

import { useState } from 'react';
import { Button, Input, Label } from '@/components';
import { createTask } from './action';

export const CreateTaskForm = ({ lessonId }: { lessonId?: string }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const asyncCreateTask = async () => {
        const res = await createTask(lessonId ?? '', title, description);

        if (res.error) {
            console.error(res.error.message);
        }

        if (res.data) {
            alert('Task created!');
        }

        setTitle('');
        setDescription('');
    };

    return (
        <div className="border border-neutral-800 p-8 rounded-2xl overflow-hidden w-full max-w-125 ">
            <form className="flex flex-col gap-2">
                <Label>Title is required</Label>
                <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Label>Description is optional</Label>
                <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <Button type="button" disabled={title.trim() === ''} onClick={asyncCreateTask}>
                    Create
                </Button>
            </form>
        </div>
    );
};
