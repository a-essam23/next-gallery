const { format, createLogger, transports } = require("winston");
const winston = require("winston");
const { timestamp, combine, printf } = format;
const path = require("path");
const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}:${message}`;
});
const dateFormat = () => {
  return new Date(Date.now()).toLocaleString();
};
class loggerService {
  constructor(test) {
    this.test = test;
    console.log(test);
    const logger = winston.createLogger({
      level: "info",
      format: winston.format.printf((info) => {
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${
          info.message
        } |`;
        message = info.obj
          ? message + `data ${JSON.stringify(info.obj)} |`
          : message;
        return message;
      }),

      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: path.join(__dirname, "./log", test),
        }),
      ],
    });
    this.logger = logger;
  }

  async info(message) {
    this.logger.log("info", message);
  }
  async info(message, obj) {
    this.logger.log("info", message, { obj });
  }
  async error(message) {
    this.logger.log("error", message);
  }
  async error(message) {
    this.logger.log("error", message, { obj });
  }
  async debug(message) {
    this.logger.log("debug", message);
  }
  async debug(message) {
    this.logger.log("debug", message, { obj });
  }
}
module.exports = loggerService;
