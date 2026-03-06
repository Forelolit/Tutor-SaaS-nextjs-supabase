import { Spinner } from '@/components';
import { Suspense } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <Suspense fallback={<Spinner className="size-10" />}>{children}</Suspense>
        </section>
    );
}
