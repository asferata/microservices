const BaseError = require('@errors/baseError');
const Ajv = require('ajv');

class ValidationError extends BaseError {
    constructor(error) {
        super(400, false);

        this.name = this.constructor.name;
        if(error instanceof Ajv.ValidationError) {
            this.message = error.errors.map(err => {
                return `${err.dataPath.substring(1)} ${err.message}`;
            });
        }
        else {
            this.message = "Validation failed";
            if(error && error.message) {
                this.message += `: ${error.message}`;
            }
        }
    }
}

module.exports = ValidationError;