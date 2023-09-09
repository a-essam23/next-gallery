// const { logger } = require("../logger");
const AppError = require("../utils/appError");

//?1 Handling Cast ERROR!
const handleCastErrorDB = (err) => {
    console.log("HANDLING CAST ERROR");
    const message = `Invalid ${err.path}:${err.value}.`;
    return new AppError(400, message);
};

//?2 Handling duplicate ERROR!
const handleDuplicateFieldsDB = (err) => {
    const value = err.keyValue.name;
    let message = "";
    if (value) {
        message = `"${value}" is already taken. Please use another value.`;
    } else {
        if (Object.keys(err.keyValue)[0] === "cover.filename") {
            message = `This file has already been uploaded.`;
        }
    }
    return new AppError(400, message);
};

//?3 Handling Validation ERROR!
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) =>
        el.message.replace("Path ", "")
    );

    const message = `${errors.join(". ")}`;
    return new AppError(400, message);
};

const handleDuplicateValuesLocalDB = (err) => {
    new AppError(409, "There is another document with the same name");
};

const sendErrorDevMode = (err, res) => {
    console.log(err);
    // logger.error({ message: err, labels: { task: "global_error_handler" } });
    res.status(err.status || 500).json({
        status: err.status,
        error: err.error,
        stack: err.stack,
        message: err.message,
    });
};

const sendErrorProdMode = (err, res) => {
    if (err.operational) {
        res.status(err.status).json({
            error: err.error,
            message: err.message,
        });
    } else {
        res.status(500).json({
            errror: "error",
            message: "Something went very wrong!",
        });
    }
};
/**************************************************/

module.exports = (err, req, res, next) => {
    console.log(err, err.name);
    err.status = err.status || 500;
    err.error = err.error || "error";

    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    if (err.code === 409) err = handleDuplicateValuesLocalDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (process.env.NODE_ENV === "production") {
        sendErrorProdMode(err, res);
    } else {
        sendErrorDevMode(err, res);
    }
};
