export const dbQuery = async (promise) => {
    const { data, error } = await promise;

    if (error) throw error;

    return data;
};
