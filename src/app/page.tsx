'use client';

import { useUserStore } from '@/stores';
import { TeacherHeroBlock } from './(heroBlocks)/TeacherHeroBlock';
import { StudentHeroBlock } from './(heroBlocks)/StudentHeroBlock';

export default function Home() {
    const isAuth = useUserStore((state) => state.isAuth);
    const role = useUserStore((state) => state.user?.role);

    return (
        <section>
            {!isAuth && (
                <div className="text-center">
                    <h2>Sign in to use the app</h2>
                </div>
            )}

            {isAuth && role === 'teacher' && <TeacherHeroBlock />}

            {isAuth && role === 'student' && <StudentHeroBlock />}
        </section>
    );
}
