const config = require('./config.js');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

//
// express

const app = express(config.server.port);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//
// routes

app.use('/api/v1/topics', require('./routes/topics'));

//
// swagger

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc/swagger_v1.json');

app.use('/api/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//
// errors

// catch 404 and forward to error handler

app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler

app.use(function (error, req, res) {
    // set locals, only providing error in development
    res.locals.message = error.message;
    res.locals.error = req.app.get('env') === 'development' ? error : {};

    // render the error page

    res.json(error.status || 500, {code: 'GENERIC_ERROR', message: error.message});
});

//
// express (starting server)

app.listen(config.server.port, function () {
    console.log(`Node server listening on port ${config.server.port}`);
});

module.exports = app;