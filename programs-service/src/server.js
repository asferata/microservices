'use strict';

require('module-alias/register');

const mongoose = require('mongoose');
var restify = require('restify');
// const config = require('config');
const mongodbConfig = require('@config/default');
const {ErrorHandler} = require('@errors/');
mongoose.connect(mongodbConfig.connectionString, {useNewUrlParser: true});

let server = restify.createServer();

require('@routes/programs')('/api/v1/programs', server);

server.get('/healthcheck', function (req, res, next) {
    res.json(200, "It's alive");
    return next();
});

server.on('restifyError', function (req, res, err, cb) {
    // this listener will fire after both events above!
    // `err` here is the same as the error that was passed to the above
    // error handlers.
    if (res.headersSent) {
        return next(err)
    }

    ErrorHandler.handle(err, res);

    return cb();
});

server.listen(8040, function () {
    console.log(`Example app listening at ${server.url}`)

});