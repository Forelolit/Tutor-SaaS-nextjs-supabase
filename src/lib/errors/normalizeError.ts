import { PostgrestError } from '@supabase/supabase-js';
import {
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ValidationError,
    NetworkError,
    UnknownError,
} from './errors';

interface SupabaseError {
    code: PostgrestError['code'];
    message: PostgrestError['message'];
    status: number;
}

export function normalizeError(error: SupabaseError) {
    if (!error) return new UnknownError();

    if (error.code === 'PGRST301') {
        return new UnauthorizedError();
    }

    if (error.code === '42501') {
        return new ForbiddenError();
    }

    if (error.code === '23505') {
        return new ValidationError('Duplicate value');
    }

    if (error.message === 'Failed to fetch') {
        return new NetworkError();
    }

    if (error.status === 401) {
        return new UnauthorizedError();
    }

    if (error.status === 403) {
        return new ForbiddenError();
    }

    if (error.status === 404) {
        return new NotFoundError();
    }

    return new UnknownError();
}
