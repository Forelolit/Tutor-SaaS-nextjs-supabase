'use client';

import { useUserStore, useLessonsStore } from '@/stores/index';
import { Avatar, AvatarFallback, AvatarImage, Button, Separator } from '@/components';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export const Profile = () => {
    const firstname = useUserStore((state) => state.user?.first_name);
    const role = useUserStore((state) => state.user?.role);
    const isAuth = useUserStore((state) => state.isAuth);
    const clearUser = useUserStore((state) => state.clearUser);
    const clearLessons = useLessonsStore((state) => state.clearLessons);

    const logOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Logout failed:', error.message);
        } else {
            console.log('User signed out successfully.');
            clearUser();
            clearLessons();
        }
    };

    return (
        <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
                {isAuth && (
                    <div className="flex items-center gap-2 h-8">
                        <p>
                            Role: <span className="capitalize text-violet-600">{role}</span>
                        </p>
                        <Separator orientation="vertical" />
                        <p>
                            <span className="text-blue-600">{firstname}</span>
                        </p>
                        <Separator orientation="vertical" />

                        <Link href={'/profile'}>
                            <Avatar className="size-10">
                                <AvatarImage src="" />
                                <AvatarFallback>{firstname?.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </Link>
                    </div>
                )}
            </div>

            {isAuth && <Button onClick={logOut}>Sign out</Button>}

            {!isAuth && (
                <div className="flex items-center gap-4">
                    <Link href={'/signup'}>
                        <Button>Sign up</Button>
                    </Link>
                    <Link href={'/signin'}>
                        <Button>Sign in</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};
