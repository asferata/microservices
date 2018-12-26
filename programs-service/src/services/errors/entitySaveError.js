const BaseError = require('@errors/baseError');

class EntitySaveError extends BaseError {
    constructor(message, original) {
        super(true);

        this.name = this.constructor.name;

        this.message = message ||
            'Failed to save entity';
        this.preserveStack(original);
    }
}

module.exports = EntitySaveError;