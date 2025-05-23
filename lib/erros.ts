export class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode = 500) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
    }
}

export class InvalidId extends AppError {
    constructor() {
        super(`Invalid id provided`, 400);
    }
}

// Recipe
export class MissingDetailRecipe extends AppError {
    constructor() {
        super('Missing recipe detail', 400);
    }
}

export class InvalidRecipeFormat extends AppError {
    constructor() {
        super('title or description not correct', 400);
    }
}

export class MissingIngredientRecipe extends AppError {
    constructor() {
        super('Missing ingredient', 400);
    }
}

export class InvalidIngredientFormat extends AppError {
    constructor(num: number) {
        super(`Invalid ingredient ${num}`, 400);
    }
}

export class MissingStepRecipe extends AppError {
    constructor() {
        super('Missing ingredient', 400);
    }
}

export class InvalidStepFormat extends AppError {
    constructor(num: number) {
        super(`Invalid step ${num}`, 400);
    }
}

// File
export class InvalidFileTypeError extends AppError {
    constructor() {
        super('Invalid file type. Only PNG and JPEG are allowed.', 400);
    }
}

export class FileTooLargeError extends AppError {
    constructor() {
        super('File too large. Maximum size is 5MB.', 400);
    }
}
