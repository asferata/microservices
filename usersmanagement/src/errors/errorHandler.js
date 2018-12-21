const {EntityNotFoundError, EntitySaveError} = require('@serviceErrors/');
const {ValidationError} = require('@validationErrors/');
const BaseError = require('./baseError');
const Ajv = require('ajv');
const moment = require('moment');
//
// // TODO: Natalie - function that returns function?
// const rewriteValidationError = error =>
//     error.errors.map(err => {
//         return `${err.dataPath.substring(1)} ${err.message}`;
//     });

const print = logger => err => {
    const datetime = moment().format('YYYY-MM-DD HH:mm:ss.SSS Z');
    const message = err.stack ? err.stack : err;
    logger(datetime + ' ' + message);
};

const printConsole = print(console.log);

const handle = (err, res) => {
    /*if (err instanceof Ajv.ValidationError) {
        res.status(400).send(rewriteValidationError(err));
        return;
    }*/

    // proper handling
    /*
    if (err instanceof ValidationError) {
        res.status(400).send(err.message);
        return;
    }
    else if(err instanceof EntityNotFoundError) {
        res.status(404).send(err.message);
        return;
    }

    printConsole(err);
    if(err instanceof EntitySaveError) {
        res.status(500).send(err.message);
    }
    else {
        res.status(err.status || 500)
            .send(err.message || "Something wicked this way came");
    }*/

    // pretty proper handling
    if(err instanceof BaseError) {
        if(err.loggable) {
            printConsole(err);
        }

        res.status(err.status).send(err.message);
    }
    else {
        res.status(err.status || 500)
            .send(err.message || "Something wicked this way came");
    }
};

const ErrorHandler = {
    print,
    printConsole,
    handle
};

module.exports = ErrorHandler;