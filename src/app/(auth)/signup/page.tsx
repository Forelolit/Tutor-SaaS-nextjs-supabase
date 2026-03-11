'use client';

import * as yup from 'yup';
import { Button, Field, FieldContent, FieldLabel, Input, RadioGroup, RadioGroupItem, Spinner } from '@/components';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { signUp } from './actions';
import { toast } from 'sonner';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FieldError } from '@/lib/helpers/FieldError';

const schema = yup
    .object({
        firstname: yup.string().min(3, 'First name must be at least 3 characters').required('First name is required'),
        lastname: yup.string().min(3, 'Last name must be at least 3 characters').required(),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        userRole: yup.string().oneOf(['student', 'teacher'], 'Invalid role').required('Role is required'),
    })
    .required();

type FormData = yup.InferType<typeof schema>;

type Option = {
    id: string;
    label: string;
};

export default function SignupPage() {
    const router = useRouter();

    const options: Option[] = [
        { id: 'student', label: 'student' },
        { id: 'teacher', label: 'teacher' },
    ];

    const { mutate, isPending } = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            toast.success('Success sign up!');
            router.push('/');
        },
    });

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            userRole: 'student',
        },
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        mutate(data);
        reset();
    };

    return (
        <section className="flex flex-col gap-2 justify-center items-center h-[80vh]">
            <h1>Sign up</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2 w-full max-w-125 border border-neutral-800 p-8 rounded-2xl overflow-hidden">
                <Input {...register('firstname')} autoComplete="name" placeholder="First name" />
                <FieldError error={errors.firstname?.message} />

                <Input {...register('lastname')} autoComplete="name" placeholder="Last name" />
                <FieldError error={errors.lastname?.message} />

                <Input {...register('email')} autoComplete="email" placeholder="Email" />
                <FieldError error={errors.email?.message} />

                <Input
                    {...register('password')}
                    autoComplete="current-password"
                    placeholder="Password"
                    type="password"
                />
                <FieldError error={errors.password?.message} />

                <Controller
                    name="userRole"
                    control={control}
                    defaultValue="student"
                    render={({ field }) => (
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="flex">
                            {options.map((option) => (
                                <Field key={option.id} orientation="horizontal">
                                    <RadioGroupItem value={option.label} id={option.id} />
                                    <FieldContent className="bg-indigo-100 rounded p-2">
                                        <FieldLabel htmlFor={option.id} className="capitalize text-blue-800">
                                            {option.label}
                                        </FieldLabel>
                                    </FieldContent>
                                </Field>
                            ))}
                        </RadioGroup>
                    )}
                />
                <FieldError error={errors.userRole?.message} />

                <Button disabled={isPending} className="mt-2">
                    {isPending ? <Spinner /> : 'Sign up'}
                </Button>
            </form>
        </section>
    );
}
