export const authQuery = async <T extends { data: any; error: any }>(
    query: PromiseLike<T>,
): Promise<NonNullable<T['data']>> => {
    const { data, error } = await query;

    if (error) {
        throw error;
    }

    if (!data) {
        throw new Error('Auth returned empty data');
    }

    return data;
};
