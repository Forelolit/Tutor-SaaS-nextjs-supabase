'use client';

import Profile from '@/app/profile/page';
import { Separator } from '@/components';
import { useLessonsStore, useUserStore } from '@/stores';
import Link from 'next/link';

export const Header = () => {
    const lessons = useLessonsStore((state) => state.lessons);
    const isAuth = useUserStore((state) => state.isAuth);
    const role = useUserStore((state) => state.user?.role);

    return (
        <header>
            <div className="container mx-auto flex justify-between items-center">
                <Link href={'/'}>
                    <h2>
                        Tutor SaaS <small>in development</small>
                    </h2>
                </Link>
                {isAuth && role === 'teacher' && lessons?.length && <Link href={'/dashboard'}>To dashboard</Link>}
                <Profile />
            </div>
            <Separator />
        </header>
    );
};
