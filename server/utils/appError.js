class AppError extends Error {
    constructor(status, message) {
        super(message);
        this.message = message;
        this.status = status;
        this.error = `${status}`.startsWith("4") ? "fail" : "error";
        this.operational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
