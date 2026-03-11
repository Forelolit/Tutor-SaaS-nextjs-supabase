import { PostgrestError } from '@supabase/supabase-js';
import {
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ValidationError,
    NetworkError,
    UnknownError,
    ConstraintError,
    UserAlreadyExistsError,
} from './errors';

interface SupabaseError {
    code?: PostgrestError['code'];
    message?: PostgrestError['message'];
    status?: number;
}

export function normalizeError(error: SupabaseError | null) {
    console.error('RAW ERROR:', error);

    if (!error) return new UnknownError();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;

    const code = err.code;
    const message = err.message;
    const status = err.status;

    if (!error) return new UnknownError();

    //Supabase errors

    if (code === 'PGRST301' || status === 401) {
        return new UnauthorizedError();
    }

    if (code === '42501' || status === 403) {
        return new ForbiddenError();
    }

    if (code === 'PGRST116' || status === 404) {
        return new NotFoundError();
    }

    if (code === '23505') {
        return new ValidationError('Duplicate value');
    }

    if (code === '23514') {
        return new ConstraintError();
    }

    if (code === 'user_already_exists') {
        return new UserAlreadyExistsError();
    }
    //Http errors

    if (message === 'Failed to fetch' || message?.includes('NetworkError')) {
        return new NetworkError();
    }

    return new UnknownError(error);
}
