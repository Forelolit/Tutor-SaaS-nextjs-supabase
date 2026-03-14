export const dbQuery = async <T>(promise: Promise<{ data: T | null; error: unknown }>): Promise<T> => {
    const { data, error } = await promise;

    if (error) {
        throw error;
    }

    if (data === null) {
        throw new Error('No data returned from Supabase');
    }

    return data;
};
