const environment = require('./environment.js');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

//
// express

const app = express(environment.server.port);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('json spaces', 2);

//
// routes

app.use('/api/v1/topics', require('./routes/topics'));

//
// swagger

const swaggerUi = require('swagger-ui-express');
const swaggerDocumentV1 = require('./doc/swagger_v1.json');

app.use('/api/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocumentV1));

//
// errors

// catch 404 and forward to error handler

app.use(function (req, res) {
    res.status(404).json({code: 'GENERIC_ERROR', message: "Not found"});
});

// error handler

app.use(function (error, req, res) {
    // set locals, only providing error in development
    res.locals.message = error.message;
    res.locals.error = req.app.get('env') === 'development' ? error : {};

    // render the error page

    res.status(error.status || 500).json({code: 'GENERIC_ERROR', message: error.message});
});

//
// express (starting server)

app.listen(environment.server.port, function () {
    console.log(`Node server listening on port ${environment.server.port}`);
});

module.exports = app;