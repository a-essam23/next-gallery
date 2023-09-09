const express = require("express");
const client = require("prom-client");
const chalk = require("chalk");
const app = express();

module.exports.httpRequestCount = new client.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "statusCode"],
});

module.exports.restResponseTimeHistogram = new client.Histogram({
    name: "rest_response_time_duration_seconds",
    help: "Rest API response time in seconds",
    labelNames: ["method", "route", "status_code", "ip"],
    // buckets: [0.1, 5, 15, 50, 100, 200, 500],
});
module.exports.currentPlayersGauge = new client.Gauge({
    name: "state_players_gauge",
    help: "Total players gauge",
});

module.exports.currentLobbiesGauge = new client.Gauge({
    name: "state_lobbies_gauge",
    help: "Total lobbies gauge",
});

module.exports.currentGamesGauge = new client.Gauge({
    name: "state_games_gauge",
    help: "Total games gauge",
});

module.exports.databaseResponseTimeHistogram = new client.Histogram({
    name: "db_response_time_duration_seconds",
    help: "Database response time in seconds",
    labelNames: ["operation", "success"],
    // buckets: [0.1, 5, 15, 50, 100, 200, 500],
});

module.exports.startmMetricsServer = function () {
    const collectDefaultMetrics = client.collectDefaultMetrics;
    collectDefaultMetrics();

    app.get("/metrics", async (req, res) => {
        res.set("Content-Type", client.register.contentType);
        return res.send(await client.register.metrics());
    });
    app.listen(9110, () => {
        console.log(chalk.yellow("Metrics server up on port 9110"));
    });
};
