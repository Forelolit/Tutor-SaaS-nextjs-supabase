'use client';

import { useUserStore, useLessonsStore } from '@/stores/index';
import { Button } from '@/components';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

const Profile = () => {
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
        <div className="flex items-center gap-4">
            {isAuth && (
                <div>
                    <h5>First name: {firstname}</h5>
                    <h5>
                        Role: <span className="capitalize">{role}</span>
                    </h5>
                </div>
            )}
            {!isAuth && (
                <div>
                    <h5>Guest</h5>
                </div>
            )}

            {isAuth && <Button onClick={logOut}>logOut</Button>}
            {!isAuth && (
                <>
                    <Link href={'/signup'}>
                        <Button>Sign up</Button>
                    </Link>
                    <Link href={'/signin'}>
                        <Button>Sign in</Button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default Profile;
