'use client';

import { Button, Input, Label } from '@/components';
import { createTask } from './action';
import { useState } from 'react';

const CreateTaskForm = ({ lessonId }: { lessonId?: string }) => {
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
        <>
            <h4 className="">Create task form</h4>
            <form className="w-full max-w-100">
                <Label>Title is required</Label>
                <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Label>Description is optional</Label>
                <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <Button type="button" disabled={title.trim() === ''} onClick={asyncCreateTask}>
                    Create
                </Button>
            </form>
        </>
    );
};

export default CreateTaskForm;
