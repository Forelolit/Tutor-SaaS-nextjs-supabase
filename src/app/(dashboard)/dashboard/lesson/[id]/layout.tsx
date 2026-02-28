import { Suspense } from 'react';

export default function DashboardLessonLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <Suspense fallback={<div />}>{children}</Suspense>
        </section>
    );
}
