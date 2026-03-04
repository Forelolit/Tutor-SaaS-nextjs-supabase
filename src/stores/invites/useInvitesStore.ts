import { InviteData } from '@/types/inviteData';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface InvitesStore {
    invites: InviteData[] | null;
    setInvites: (invites: InvitesStore['invites']) => void;
    clearInvite: (invite: InviteData['id']) => void;
}

export const useInvitesStore = create<InvitesStore>()(
    persist(
        (set) => ({
            invites: [],
            setInvites: (invites) => set({ invites }),
            clearInvite: (oldInviteId) => {
                if (!oldInviteId) return;

                set((state) => ({
                    invites: state.invites ? state.invites.filter((invite) => invite.id !== oldInviteId) : [],
                }));
            },
        }),
        {
            name: 'tutor_saas_invites',
        },
    ),
);
