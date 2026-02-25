import { Suspense } from 'react';
import Loading from './loading';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <Suspense fallback={<Loading />}>{children}</Suspense>
        </section>
    );
}
