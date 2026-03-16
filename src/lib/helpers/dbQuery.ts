type CrudResult<T> = {
    data: T | null;
    error: unknown;
};

export const dbQuery = async <T>(query: PromiseLike<CrudResult<T>>): Promise<T> => {
    const { data, error } = await query;

    if (error) {
        throw error;
    }

    if (data === null) {
        throw new Error('Supabase CRUD returned null');
    }

    return data;
};
