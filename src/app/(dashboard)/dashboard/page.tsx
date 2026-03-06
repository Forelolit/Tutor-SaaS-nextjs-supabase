'use client';

import { useLessonsStore } from '@/stores/lessons/useLessonsStore';
import { useUserStore } from '@/stores';
import { TeacherDashboard } from './(teacherDashboard)/TeacherDashboard';
import { StudentDashboard } from './(studentDashboard)/StudentDashboard';

const DashboardPage = () => {
    const lessons = useLessonsStore((state) => state.lessons);
    const role = useUserStore((state) => state.user?.role);

    return (
        <>
            {role === 'teacher' && <TeacherDashboard lessons={lessons} />}
            {role === 'student' && <StudentDashboard lessons={lessons} />}
        </>
    );
};

export default DashboardPage;
