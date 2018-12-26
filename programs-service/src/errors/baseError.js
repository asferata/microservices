class BaseError extends Error {
    constructor(status = 500, loggable = true) {
        super();

        this.name = this.constructor.name;
        if(status && 'boolean' === typeof status) {
            this.status = 500;
            this.loggable = status;
        }
        else {
            this.status = status;// || 500;
            this.loggable = loggable;// || true;
        }
    }

    preserveStack (original) {
        Error.captureStackTrace(this, this.constructor);
        if (original) {
            this.original = original;
            // this.new_stack = this.stack
            let messageLines = (this.message.match(/\n/g) || []).length + 1;
            this.stack = this.stack.split('\n').slice(0, messageLines + 1).join('\n') + '\n' +
                this.original.stack;
        }
    };
}

module.exports = BaseError;