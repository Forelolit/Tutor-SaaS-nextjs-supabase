'use client';
import { handleGlobalError } from '@/lib/errors/handleGlobalError';
import { normalizeError } from '@/lib/errors/normalizeError';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                queryCache: new QueryCache({
                    onError: (error) => {
                        const e = normalizeError(error);
                        handleGlobalError(e);
                    },
                }),
                mutationCache: new MutationCache({
                    onError: (error) => {
                        const e = normalizeError(error);
                        handleGlobalError(e);
                    },
                }),
            }),
    );
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
