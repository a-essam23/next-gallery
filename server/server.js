const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

let port = process.env.PORT || 3000;
let hostname = process.env.HOST || "localhost";

const app = require("./app");
const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
    // console.log("Online database reported")
);

mongoose
    .connect(
        // process.env.NODE_ENV === "development"
        //     ? process.env.DATABASE_LOCAL
        //     :
        DB,
        { dbName: "roman" }
    )
    .then(() => {
        console.log("DB connection successful!".cyan);
    });

app.listen(port, hostname, function () {
    console.log(`Server running on ${hostname + ":" + port}`.green);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION!");
    console.log(err.stack);
});

process.on("uncaughtException", (err) => {
    console.log("Uncaught expection!");
    console.log(err.stack);
    process.exit(1);
});

module.exports = app;
//TEST
