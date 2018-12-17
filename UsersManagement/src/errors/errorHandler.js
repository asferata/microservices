const moment = require('moment');

const print = logger => err => {
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS Z');
    const message = err.stack ? err.stack : err;
    logger(dateTime + ' ' + message);
};

const printConsole = print(console.log);

const handle = (err, res) => {
    printConsole(err);

    res.status(err.status || 500)
        .send(err.message || "Something wicked this way came");
};

const ErrorHandler = {
    handle,
    print,
    printConsole
};

module.exports = ErrorHandler;