'use client';

import { Suspense, useState } from 'react';
import { useUserStore } from '../api/user/useUserStore';
import { Skeleton } from '@/components';

export default function Instruments() {
    const user = useUserStore((state) => state.user);
    const isAuth = useUserStore((state) => state.isAuth);
    const [auth, setAuth] = useState(isAuth);

    setTimeout(() => {
        return setAuth(true);
    }, 4000);

    return (
        <Suspense fallback={<div>Loading instruments...</div>}>
            {auth ? (
                <ul>
                    <li>{user?.first_name}</li>
                    <li>{user?.last_name}</li>
                    <li>{user?.email}</li>
                    <li>{user?.role}</li>
                    <li>{user?.created_at}</li>
                </ul>
            ) : (
                <div className="grid gap-2">
                    <Skeleton className="w-80 h-6 rounded-2xl" />
                    <Skeleton className="w-70 h-6 rounded-2xl" />
                    <Skeleton className="w-90 h-6 rounded-2xl" />
                    <Skeleton className="w-50 h-6 rounded-2xl" />
                </div>
            )}
        </Suspense>
    );
}
