'use client';

import { Button, Input, Label } from '@/components';
import { useState } from 'react';
import { createInvite } from './action';

export const InviteStudentForm = ({ lessonId }: { lessonId: string }) => {
    const [email, setEmail] = useState('');
    const sendInvite = async () => {
        const res = await createInvite(lessonId, email);
        if (res.error) {
            return;
        }
        alert('Invite created!');
        setEmail('');
    };

    return (
        <div className="border border-neutral-800 p-8 rounded-2xl overflow-hidden w-full max-w-125">
            <form className="flex flex-col gap-2">
                <Label>Email is required</Label>
                <Input
                    autoComplete="email"
                    placeholder="Students email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="button" disabled={email.trim() === ''} onClick={sendInvite}>
                    Send invite
                </Button>
            </form>
        </div>
    );
};
