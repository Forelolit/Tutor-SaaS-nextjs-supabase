import { formatDistanceToNow } from 'date-fns';

export const getCreatedAtSubDays = (created_at: string | null) => {
    if (!created_at) return '—';
    return formatDistanceToNow(new Date(created_at), { addSuffix: true });
};
