const BaseError = require('@errors/baseError');

class AuthError extends BaseError {
    constructor(message, status, original) {
        super(true);

        this.name = this.constructor.name;
        this.message = message ||
            'Failed to authenticate user';

        if(status instanceof Error && !original) {
            this.status = 401;
            this.preserveStack(status);
        }
        else {
            this.status = status || 401;
            this.preserveStack(original);
        }
    }
}

module.exports = AuthError;