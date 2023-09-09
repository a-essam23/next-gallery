const path = require("path");
let options = {
    development: ".env.local",
    production: ".env.production",
    staging: ".env.staging.local",
};

require("dotenv").config({
    path: path.join(
        process.cwd(),
        options[process.env.NODE_ENV || "development"]
    ),
});

const mongoose = require("mongoose");
function connect(callback) {
    mongoose
        .connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
        })
        .then(() => {
            console.info({
                message: "DB connected!",
                labels: { task: "db" },
            });
            callback();
        });
}

module.exports = { connect };
