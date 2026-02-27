'use client';

import { useState } from 'react';
import { Button, Input } from '@/components';
import { signin } from './actions';
import { redirect } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signinHandler = async () => {
        const res = await signin(email, password);
        if (res.data.session?.access_token) {
            alert('success sign in');
            redirect('/');
        } else {
            console.error(res.error?.message);
        }
    };

    return (
        <form>
            <Input autoComplete="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
                autoComplete="current-password"
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="button" disabled={email.trim() === '' || password.trim() === ''} onClick={signinHandler}>
                Sign up
            </Button>
        </form>
    );
}
