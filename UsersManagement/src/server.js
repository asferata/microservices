'use strict';

require('module-alias/register');

const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const routes = require('@routes/');
const {ErrorHandler} = require('@errors/');

let app = express();

app.use(bodyParser.json());
app.use('/api/users', routes.Users);

app.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }

    ErrorHandler.handle(err, res);
});

let server = app.listen(8081, function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});