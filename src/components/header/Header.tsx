'use client';

import { Profile } from '@/components';
import { useUserStore } from '@/stores';
import Link from 'next/link';

export const Header = () => {
    const isAuth = useUserStore((state) => state.isAuth);

    return (
        <header className="border py-2">
            <div className="container mx-auto flex justify-between items-center">
                <Link href={'/'}>
                    <h2>
                        Tutor SaaS <small>in development</small>
                    </h2>
                </Link>
                {isAuth && <Link href={'/dashboard'}>Dashboard</Link>}
                <Profile />
            </div>
        </header>
    );
};
