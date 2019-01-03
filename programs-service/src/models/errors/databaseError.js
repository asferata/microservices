const BaseError = require('@errors/baseError');

class DatabaseError extends BaseError {
    constructor(message, original) {
        super(500, true);

        this.name = this.constructor.name;
        this.message = message ||
            'Database operation failed';

        /*Error.captureStackTrace(this, this.constructor);
        this.original = original;
        if (this.original) {
            // this.new_stack = this.stack
            let messageLines = (this.message.match(/\n/g) || []).length + 1;
            this.stack = this.stack.split('\n').slice(0, messageLines + 1).join('\n') + '\n' +
                original.stack;
        }*/
        this.preserveStack(original);
    }
}

module.exports = DatabaseError;