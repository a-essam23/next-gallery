const db = require("./mongoose");
const app = require("./app");
const http = require("http");
const { startmMetricsServer } = require("./server-metrics");
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = require("./io")(server);
const { logger, log } = require("./utils/logger");

//* init preferences
const initPreferences = require('./misc/init-preferences')


db.connect(async () => {
    await initPreferences()
     server.listen(PORT, () => {
        startmMetricsServer();
        log.info(`Server is up on port ${PORT}`, { task: "SERVER" });
    });
});

process.on("unhandledRejection", (err) => {
    log.error(err, { task: "SERVER" });
});

process.on("uncaughtException", (err) => {
    log.error(err, { task: "SERVER" });
});

process.on("warning", (err) => {
    log.warning(err, { task: "SERVER" });
});

module.exports = { app, io };
