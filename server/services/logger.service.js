const { format, createLogger, transports } = require("winston");
const { timestamp, combine, printf } = format;
const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}:${message}`;
});
const dateFormat = () => {
  return new Date(Date.now()).toLocaleString();
};
const logger = createLogger({
  format: combine(
    // label({ label: "right now!" }),
    format.colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [new transports.Console()],
});
module.exports = logger;
