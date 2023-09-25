export class AppError extends global.Error {
    name: string;
    status: number;
    type: "FAIL" | "ERROR";
    operational: boolean;
    message: string;
    stack?: string | undefined;
    constructor(message: string, status: number, name: string) {
        super(message);
        this.message = message;
        this.status = status;
        this.type = `${status}`.startsWith("4") ? "FAIL" : "ERROR";
        this.operational = true;
        this.name = name || "UNDEFINED";
        Error.captureStackTrace(this, this.constructor);
    }
    AuthenticationError() {}
}

export namespace AppError {
    export const createError = (
        status: number,
        message: string,
        name: string
    ) => new AppError(message, status, name);
    export const createAuthenticationError = (msg: string) =>
        new AppError(msg, 401, "AuthenticationError");

    export const AuthenticationError = createAuthenticationError(
        '"Failed to authenticate"'
    );

    export const createDocumentNotFoundError = (label: string) =>
        new AppError(
            `Requested ${label} could not be found`,
            404,
            "DocumentNotFoundError"
        );
    export const DocumentNotFoundError = createDocumentNotFoundError(
        "Requsted document could not be found"
    );

    export const createMulterError = (msg: string) =>
        new AppError(msg, 400, "MulterError");

    export const createUploadError = (msg: string = "No file attached") =>
        new AppError(msg, 400, "UploadMethodError");

    export const createMissingEnviromentVar = (label: string) =>
        new AppError(
            `${label} is missing from your .env file. Please make sure it's setup correctly.`,
            400,
            "MissingEnviromentVariableError"
        );

}
