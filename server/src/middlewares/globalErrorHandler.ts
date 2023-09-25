import { AppError } from "@utils";
import { log } from "@utils/logger";
import { NextFunction, Request, Response } from "express";
import { MongoServerError } from "mongodb";
import { CastError, Error } from "mongoose";
import { MulterError } from "multer";

const handleDocumentNotFoundError = (err: Error.DocumentNotFoundError) => {
    return new AppError(`${err.query} could not be found`, 404, err.name);
};
const handleCastErrorDB = (err: CastError) => {
    const message = `Invalid ${err.path}:${err.value}.`;
    return new AppError(message, 400, err.name);
};
const handleDuplicateFieldsDB = (err: MongoServerError) => {
    const message = `This "${Object.keys(err.keyValue)[0]}" is already taken.`;
    return new AppError(message, 400, err.name);
};
const handleValidationErrorDB = (err: Error.ValidationError) => {
    const errors = Object.values(err.errors).map((el) =>
        el.message.replace("Path ", "")
    );

    const message = `${errors.join(". ")}`;
    return new AppError(message, 400, err.name);
};

const handleUnexpectedFieldMulter = (err: MulterError) => {
    return AppError.createMulterError("Unauthorized file upload");
};

const handleError = (err: AppError | Error) => {
    let error = err as MongoServerError;
    if (error.code) {
        switch (error.code) {
            case 11000:
                return handleDuplicateFieldsDB(error);
        }
    }
    switch (err.constructor) {
        case Error.CastError:
            return handleCastErrorDB(err as CastError);

        case Error.ValidationError:
            return handleValidationErrorDB(err as Error.ValidationError);

        case Error.DocumentNotFoundError:
            return handleDocumentNotFoundError(
                err as Error.DocumentNotFoundError
            );
        case MulterError:
            return handleUnexpectedFieldMulter(err as MulterError);
        case AppError:
            return err;
        default:
            let unHandeledError = new AppError(
                err.message || "Something went very wrong!",
                500,
                "Unhandeled Error"
            );
            unHandeledError.operational = false;
            unHandeledError.type = "ERROR";
            return unHandeledError;
    }
};

const sendErrorResponse = (err: AppError, res: Response) => {
    process.env.NODE_ENV === "production"
        ? res.status(err.status || 500).json({
              error: err.type,
              message: err.message,
          })
        : res.status(err.status || 500).json({
              status: err.status,
              type: err.type,
              stack: err.stack,
              message: err.message,
          });
};

export const globalErrorHandler = (
    err: AppError | Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    log.error(err.stack as string, { name: err.name });
    let error = handleError(err);
    sendErrorResponse(error as AppError, res);
};
