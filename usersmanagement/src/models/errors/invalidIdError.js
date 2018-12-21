const BaseError = require('@errors/baseError');

class InvalidIdError extends BaseError {
    constructor(message) {
        super(400, false);

        this.name = this.constructor.name;

        this.message = message ||
            'Invalid id';

        this.preserveStack();
    }
}

module.exports = InvalidIdError;