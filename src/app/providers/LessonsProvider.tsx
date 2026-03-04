'use client';

import { initLessonsListener } from '@/lib/services/lessons.service';
import { useEffect } from 'react';

export const LessonsProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        initLessonsListener();
    }, []);

    return <>{children}</>;
};
