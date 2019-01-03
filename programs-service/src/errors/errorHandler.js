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
    // pretty proper handling
    if(err instanceof BaseError) {
        if(err.loggable) {
            printConsole(err);
        }

        res.send(err.status, err.message);
    }
    else if(err.body && err.body.code){
        res.send(err);
    }
    else {
        res.send(err.status || 500, err.message || "Something wicked this way came");
    }
};

const ErrorHandler = {
    print,
    printConsole,
    handle
};

module.exports = ErrorHandler;