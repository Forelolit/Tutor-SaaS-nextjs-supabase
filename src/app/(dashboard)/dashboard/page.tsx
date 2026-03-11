'use client';

import { useUserStore } from '@/stores';
import { TeacherDashboard } from './(teacherDashboard)/TeacherDashboard';
import { StudentDashboard } from './(studentDashboard)/StudentDashboard';
import { useGetLessons } from './action';
import Loading from './loading';

const DashboardPage = () => {
    const role = useUserStore((state) => state.user?.role);
    const { data: lessons, isLoading } = useGetLessons();

    return (
        <>
            {isLoading && <Loading />}
            {role === 'teacher' && lessons && !isLoading && <TeacherDashboard lessons={lessons} />}
            {role === 'student' && lessons && !isLoading && <StudentDashboard lessons={lessons} />}
        </>
    );
};

export default DashboardPage;
