import { toast } from 'sonner';
import { UnauthorizedError, ForbiddenError, NetworkError, UnknownError } from './errors';

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

    if (error instanceof UnknownError) {
        toast.error('Something went wrong!');
    }
}
