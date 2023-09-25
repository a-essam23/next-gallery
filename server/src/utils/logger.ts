import path from "path";
import { config } from "dotenv";
config({
    path:
        process.env.NODE_ENV === "production"
            ? path.join(process.cwd(), ".env.production")
            : path.join(process.cwd(), ".env.local"),
});
import winston from "winston";
import WinstonLoki from "winston-loki";

const lokiTransport = new WinstonLoki({
    host: process.env.LOKI_HOST!,
    labels: { app: process.env.LOKI_APP_NAME },
});

type logLevels = "info" | "success" | "warning" | "error";
const customLevels = {
    levels: {
        info: 0,
        success: 1,
        warning: 2,
        error: 3,
    },
    colors: {
        info: "blue",
        success: "green",
        warning: "yellow",
        error: "red",
    },
};

winston.addColors(customLevels.colors);
interface CustomLogger extends winston.Logger {
    success: winston.LeveledLogMethod;
}

const logger = winston.createLogger({
    level: "error",
    transports: [lokiTransport],
    levels: customLevels.levels,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        winston.format.simple()
    ),
}) as CustomLogger;

logger.info("This is an informational message.");
logger.success("This is a successful message.");
logger.warning("This is a warning message.");
logger.error("This is an error message.");
/* 
    tasks:
        create
        read
        update
        delete
        other

*/

const _log = (
    type: logLevels,
    message: string,
    labels?: { [key: string]: any }
) =>
    logger.log(type, {
        message,
        labels: {
            ...labels,
            task: labels?.task || "NULL",
            createdAt: Date.now(),
        },
    });

export const log = {
    info: (message: string, labels?: { [key: string]: any }) =>
        _log("info", message, labels),
    success: (message: string, labels?: { [key: string]: any }) =>
        _log("success", message, labels),
    warning: (message: string, labels?: { [key: string]: any }) =>
        _log("warning", message, labels),
    error: (message: string, labels?: { [key: string]: any }) =>
        _log("error", message, labels),
};

// if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console());
// }
