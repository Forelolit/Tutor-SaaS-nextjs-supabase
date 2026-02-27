'use client';

import { useState } from 'react';
import {
    Button,
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    Input,
    RadioGroup,
    RadioGroupItem,
} from '@/components';
import LoginGoogleButton from './LoginGoogleButton';
import { signup } from './actions';
import { redirect } from 'next/navigation';

type Option = {
    id: string;
    label: string;
};

export default function SignupPage() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [password, setPassword] = useState('');

    const options: Option[] = [
        { id: 'starter', label: 'student' },
        { id: 'pro', label: 'teacher' },
    ];

    const signupHandler = async () => {
        const res = await signup(firstname, lastname, email, userRole, password);
        if (res.data.session?.access_token) {
            alert('success sign up');
            redirect('/');
        } else {
            console.error(res.error?.message);
        }
    };

    return (
        <section className="flex flex-col gap-2 justify-center items-center h-screen">
            <h1>Sign up</h1>
            <form className="flex flex-col gap-2 max-w-125 border border-neutral-800 p-8 rounded-2xl overflow-hidden">
                <Input
                    autoComplete="name"
                    placeholder="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />

                <Input
                    autoComplete="name"
                    placeholder="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />

                <Input
                    autoComplete="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    autoComplete="current-password"
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <RadioGroup
                    onValueChange={(value: string) => setUserRole(value)}
                    defaultValue="student"
                    className="flex">
                    {options.map((option) => (
                        <Field key={option.id} orientation={'horizontal'}>
                            <RadioGroupItem value={option.label} id={option.id} />
                            <FieldContent className="bg-indigo-100 rounded p-2">
                                <FieldLabel htmlFor={option.id} className="capitalize text-blue-800">
                                    {option.label}
                                </FieldLabel>
                                <FieldDescription>Standard spacing for most use cases.</FieldDescription>
                            </FieldContent>
                        </Field>
                    ))}
                </RadioGroup>

                <Button type="button" disabled={email.trim() === '' || password.trim() === ''} onClick={signupHandler}>
                    Sign up
                </Button>
                <LoginGoogleButton />
            </form>
        </section>
    );
}
