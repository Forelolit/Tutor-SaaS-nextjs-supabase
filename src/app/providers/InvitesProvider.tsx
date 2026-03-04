'use client';

import { initInvitesListener } from '@/lib/services/invite.service';
import { useEffect } from 'react';

export const InvitesProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        initInvitesListener();
    }, []);

    return <>{children}</>;
};
