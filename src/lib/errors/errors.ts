export class AppError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AppError';
    }
}

export class UnauthorizedError extends AppError {
    constructor() {
        super('Unauthorized');
        this.name = 'UnauthorizedError';
    }
}

export class UserAlreadyExistsError extends AppError {
    constructor() {
        super('User already exists');
        this.name = 'UserAlreadyExistsError';
    }
}

export class ForbiddenError extends AppError {
    constructor() {
        super('Forbidden');
        this.name = 'ForbiddenError';
    }
}

export class NotFoundError extends AppError {
    constructor() {
        super('Not found');
        this.name = 'NotFoundError';
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class NetworkError extends AppError {
    constructor() {
        super('Network error');
        this.name = 'NetworkError';
    }
}

export class ConstraintError extends AppError {
    constructor() {
        super('Constraint error');
        this.name = 'ConstraintError';
    }
}

export class UnknownError extends AppError {
    original?: unknown;

    constructor(original?: unknown) {
        super('Unknown error');
        this.original = original;
    }
}
