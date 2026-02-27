import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'student' | 'teacher';

export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    created_at: Timestamp;
}

interface UserStore {
    user: User | null;
    isAuth: boolean;

    setUser: (user: User) => void;
    updateUser: (partial: Partial<User>) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            isAuth: false,
            setUser: (user) =>
                set({
                    user,
                    isAuth: true,
                }),

            updateUser: (partial) =>
                set((state) => {
                    if (!state.user) return state;

                    return {
                        user: {
                            ...state.user,
                            ...partial,
                        },
                    };
                }),

            clearUser: () =>
                set({
                    user: null,
                    isAuth: false,
                }),
        }),
        {
            name: 'tutor_saas_user_store',
        },
    ),
);
