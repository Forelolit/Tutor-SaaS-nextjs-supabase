'use client';

import { Button, Input, Label, Spinner } from '@/components';
import { useState } from 'react';
import { createInvite } from './action';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const InviteStudentForm = ({ lessonId }: { lessonId: string }) => {
    const [email, setEmail] = useState('');
    const { mutate, isPending } = useMutation({
        mutationFn: createInvite,
        onSuccess: () => {
            toast.success('Student invited!');
        },
    });

    const sendInvite = () => {
        mutate({ lessonId, email });
        setEmail('');
    };

    return (
        <form className="w-full grid gap-2">
            <Label>Email is required</Label>
            <Input
                autoComplete="email"
                placeholder="Students email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="button" disabled={email.trim() === '' || isPending} onClick={sendInvite}>
                {isPending ? <Spinner /> : 'Send invite'}
            </Button>
        </form>
    );
};
