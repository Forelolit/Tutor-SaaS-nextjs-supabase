'use client';

import * as yup from 'yup';
import { Button, Input, Spinner } from '@/components';
import { useMutation } from '@tanstack/react-query';
import { signIn } from './actions';
import { toast } from 'sonner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { FieldError } from '@/lib/helpers/FieldError';

const schema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    })
    .required();

type FormData = yup.InferType<typeof schema>;

export default function LoginPage() {
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: signIn,
        onSuccess: () => {
            toast.success('Success sign in!');
            router.push('/');
        },
        onError: (err) => console.log(err, err.message, err.cause, err.name),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        mutate(data);
        reset();
    };

    return (
        <section className="flex flex-col gap-2 justify-center items-center h-screen">
            <h1>Sign in</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2 w-full max-w-125 border border-neutral-800 p-8 rounded-2xl overflow-hidden">
                <Input {...register('email')} autoComplete="email" placeholder="email" />
                <FieldError error={errors.email?.message} />

                <Input
                    {...register('password')}
                    autoComplete="current-password"
                    placeholder="password"
                    type="password"
                />
                <FieldError error={errors.password?.message} />

                <Button disabled={isPending}>{isPending ? <Spinner /> : 'Sign in'}</Button>
            </form>
        </section>
    );
}
