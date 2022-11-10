const AppError = require("./../utils/appError");
const app = require("../app");
//1 Handling Cast ERROR!

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}:${err.value}.`;
    return new AppError(message, 400);
};

//2 Handling duplicate ERROR!

const handleDuplicateFieldsDB = (err) => {
    const value = err.keyValue.name;

    const message = `Duplicate field value:"${value}/Key" . Please use another value.`;
    return new AppError(message, 400);
};

//3 Handling Validation ERROR!

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);

    const message = `Invalid input data.${errors.join(". ")}`;
    return new AppError(message, 400);
};
const handleJWTError = () =>
    new AppError("Invalid token please log in again.", 401);
const handleJWTExpiredError = () =>
    new AppError("Your token has expired! Please login again", 401);
const handleDuplicateValuesLocalDB = (err) => {
    new AppError("There is another file with the same name", 409);
};
// const unexpectedToken = () => new AppError("Syntax", 400);
/***********************************/

const sendErrorDevMode = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
// console.log(sendErrorDevMode);
/**************************************************/
const sendErrorProdMode = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        res.status(500).json({
            status: "error",
            message: "Something went very wrong!",
            // message2: err.message,
        });
    }
};
/**************************************************/

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        // console.log(err, res);
        sendErrorDevMode(err, res);
    } else if (process.env.NODE_ENV === "production") {
        // let error = { ...err };
        // console.log(JSON.stringify(error), " string Error");
        // console.log(JSON.stringify(err), "string err");
        if (err.name === "CastError") err = handleCastErrorDB(err);
        if (err.code === 409) err = handleDuplicateValuesLocalDB(err);
        if (err.code === 11000) err = handleDuplicateFieldsDB(err);

        if (err.name === "ValidationError") err = handleValidationErrorDB(err);
        if (err.name === "JsonWebTokenError") err = handleJWTError(err);
        if (err.name === "TokenExpiredError") err = handleJWTExpiredError(err);
        // if (err.name === "Unexpected token") err =
        sendErrorProdMode(err, res);
    }
};
