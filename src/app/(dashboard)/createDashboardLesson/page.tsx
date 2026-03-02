'use client';

import { Button, Input, Label } from '@/components';
import { useUserStore } from '@/stores/user/useUserStore';
import { createLesson } from './actions';
import { useState } from 'react';

const CreateDashboardLesson = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const userId = useUserStore((state) => state.user?.id);

    const createHandler = async () => {
        const res = await createLesson({
            title: title,
            description: description,
            owner_id: userId ?? '',
        });

        if (res?.error) {
            setError(error);
        }

        if (res?.data !== null || undefined) {
            setTitle('');
            setDescription('');
        }
    };

    return (
        <div className="flex flex-col gap-2 justify-center items-center h-[80vh]">
            <h1>Create your lesson</h1>
            <form className="flex flex-col gap-2 w-full max-w-125 border border-neutral-800 p-8 rounded-2xl overflow-hidden">
                <Input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Label>Description is optional</Label>
                <Input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <Button type="button" onClick={createHandler} disabled={title.trim() === ''}>
                    Create lesson
                </Button>

                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default CreateDashboardLesson;
