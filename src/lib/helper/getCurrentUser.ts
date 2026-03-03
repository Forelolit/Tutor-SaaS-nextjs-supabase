import { supabase } from '../supabase/client';

export const getCurrentUser = async () => {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) {
        throw new Error(error.message);
    }

    if (!user) {
        throw new Error('User not authenticated');
    }

    return user;
};
