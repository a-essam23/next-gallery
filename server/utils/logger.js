const winston = require("winston");
const WinstonLoki = require("winston-loki");

const lokiTransport = new WinstonLoki({
    host: "http://localhost:3100",
    labels: { app: "elkhedewya" },
});

const customLevels = {
    levels: {
        info: 0,
        ok: 1,
        warning: 2,
        error: 3,
    },
    colors: {
        info: "blue",
        ok: "green",
        warning: "yellow",
        error: "red",
    },
};

winston.addColors(customLevels.colors);

const logger = winston.createLogger({
    level: "error",
    transports: [lokiTransport],
    levels: customLevels.levels,
});

logger.info("This is an informational message.");
logger.ok("This is a successful message.");
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

const _log = (type, message, labels) =>
    logger.log(type, {
        message,
        labels: {
            ...labels,
            task: labels?.task || "NULL",
            createdAt: Date.now(),
        },
    });

const log = {
    info: (message, labels) => _log("info", message, labels),
    ok: (message, labels) => _log("ok", message, labels),
    warning: (message, labels) => _log("warning", message, labels),
    error: (message, labels) => _log("error", message, labels),
};

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.prettyPrint(),
                winston.format.simple()
            ),
        })
    );
}

module.exports = {
    logger,
    log,
};
