const next = require("next");
const mongoose = require("mongoose");
// require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
let port = process.env.PORT || 3000;
let hostname = process.env.HOST || "localhost";
const nextServer = next({ dev, port, hostname });
const handle = nextServer.getRequestHandler();

nextServer
    .prepare()
    .then(async () => {
        const app = require("./app");
        const DB = process.env.DATABASE.replace(
            "<password>",
            process.env.DATABASE_PASSWORD
            // console.log("Online database reported")
        );

        await mongoose
            .connect(process.env.DATABASE_LOCAL)
            // .connect(DB, { dbName: "roman" })
            .then(() => {
                console.log("DB connection successful!".cyan);
            });

        app.get("*", (req, res) => {
            return handle(req, res);
        });

        app.listen(port, hostname, function () {
            console.log(`Server running on ${hostname + ":" + port}`.green);
        });

        process.on("unhandledRejection", (err) => {
            console.log("UNHANDLED REJECTION!");
            console.log(err.stack);
            server.close(() => {
                process.exit(1);
            });
        });

        process.on("uncaughtException", (err) => {
            console.log("Uncaught expection!");
            console.log(err.stack);
            server.close(() => {
                process.exit(1);
            });
        });
    })
    .catch((e) => {
        console.log(e);
        // process.exit(1);
    });

//TEST
