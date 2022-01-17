const express = require('express');

const {noteRouter} = require("./routes");
const {code, errorMessage} = require("./errors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/notes', noteRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(5000, () => console.log('Ok'))

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || code.NOT_FOUND,
        message: err.message || errorMessage.notFound
    });
}

function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || code.SERVER_ERROR)
        .json({
            message: err.message
        });
}
