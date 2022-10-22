const next = require("next");
require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();

nextServer
    .prepare()
    .then(() => {
        const mongoose = require("mongoose");
        const app = require("./app");

        process.on("uncaughtException", (err) => {
            console.log("Uncaught expection!");
            console.log(err);
            process.exit(1);
        });
        const DB = process.env.DATABASE.replace(
            "<PASSWORD>",
            process.env.DATABASE_PASSWORD
            // console.log("Online database reported")
        );

        mongoose
            .connect(process.env.DATABASE_LOCAL, {
                // .connect(DB, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log("DB connection successful!");
            });
        let server_port = process.env.PORT || 3000;
        let server_host = process.env.HOST || "0.0.0.0";

        app.get("*", (req, res) => {
            return handle(req, res);
        });

        app.listen(server_port, server_host, function () {
            console.log("Listening on port %d", server_port);
        });

        // const port = process.env.PORT || 5000; /////
        // app.listen(process.env.PORT || 5000, () => {
        //   console.log(`App Running on ${process.env.PORT}}...`);
        // });

        process.on("unhandledRejection", (err) => {
            console.log(err);
            console.log("UNHANDLED REJECTION!");
            server.close(() => {
                process.exit(1);
            });
        });

        process.on("uncaughtException", (err) => {
            console.log("Uncaught expection!");
            console.log(err);
            server.close(() => {
                process.exit(1);
            });
        });
    })
    .catch((e) => {
        console.log(e.stack);
        // process.exit(1);
    });

//TEST
