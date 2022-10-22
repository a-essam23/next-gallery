const fs = require("fs");
const path = require("path");
const express = require("express");
const folderRouter = require("./routers/folderRouter");
const cookieParser = require("cookie-parser");
const imageRouter = require("./routers/imageRouter");
const groupRouter = require("./routers/groupRouter");

const adminRouter = require("./routers/adminRouter");
const rateLimit = require("express-rate-limit");
const mainRouter = require("./routers/mainRouter");

const morgan = require("morgan");
var cors = require("cors");
// const heroku = require("heroku");
const globalErrorHandler = require("./controllers/errorController");
const helmet = require("helmet");
const server = require("./server");
const compression = require("compression");

const app = express();
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const multer = require("multer");

// app.use(helmet());
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP,please try again in an hour!",
});
app.use(express.json({ limit: "10kb" }));
app.use("/api", limiter);
app.use(express.static(path.join(__dirname, `public`)));
app.use(express.static(path.join(__dirname, `files`)));

if (process.env.NODE_ENV === "development") {
    console.log("development");
    app.use(morgan("dev"));
} else {
    console.log("production");
}
app.use(compression());
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();

    next();
});
const domainsFromEnv = process.env.CORS_DOMAINS || "";

const whitelist = domainsFromEnv.split(",").map((item) => item.trim());

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin || whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     credentials: true,
// };
app.use(cors());

app.use("/api/v1/image", imageRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/folder", folderRouter);
app.use("/api/v1/group", groupRouter);

app.use("/api/v1/main", mainRouter);

// app.all("*", (req, res, next) => {
//   // res.status(404).json({
//   //   status: "fail",
//   //   message: `Can't find ${req.originalUrl} on this server!`,
//   // });
//   const err = new Error(`Can't find ${req.originalUrl} on this server!`);
//   err.status = "fail";
//   err.statusCode = 404;
//   next(err);
// });

app.use(globalErrorHandler);
module.exports = app;
