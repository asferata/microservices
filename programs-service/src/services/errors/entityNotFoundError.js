const BaseError = require('@errors/baseError');

class EntityNotFoundError extends BaseError {
    constructor(message, original) {
        super(404, false);

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;

        this.message = message ||
            'Entity was not found';

        // this.status = 404;
        this.preserveStack(original);
    }
}

module.exports = EntityNotFoundError;