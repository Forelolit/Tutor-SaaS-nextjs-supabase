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

export class UnknownError extends AppError {
    constructor() {
        super('Unknown error');
        this.name = 'UnknownError';
    }
}
