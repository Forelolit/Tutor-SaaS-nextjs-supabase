import { toast } from 'sonner';
import {
    UnauthorizedError,
    ForbiddenError,
    NetworkError,
    UnknownError,
    ConstraintError,
    UserAlreadyExistsError,
    ValidationError,
} from './errors';

export function handleGlobalError(error: Error) {
    if (error instanceof UnauthorizedError) {
        toast.error('Unauthorized!');
        return;
    }

    if (error instanceof ForbiddenError) {
        toast.error('Access denied!');
        return;
    }

    if (error instanceof NetworkError) {
        toast.error('Network error!');
        return;
    }

    if (error instanceof ConstraintError) {
        toast.error('Constraint violation!');
        return;
    }

    if (error instanceof UserAlreadyExistsError) {
        toast.error('User already exists!');
        return;
    }

    if (error instanceof ValidationError) {
        toast.error('Only unique value!');
        return;
    }

    if (error instanceof UnknownError) {
        console.error('UNHANDLED ERROR:', error);
    }
}
