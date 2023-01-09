const fs = require("fs");
const path = require("path");
const express = require("express");
const folderRouter = require("./routers/folder/folderRouter");
// const cookieParser = require("cookie-parser");
const imageRouter = require("./routers/image/imageRouter");
const groupRouter = require("./routers/group/groupRouter");

const usersRouter = require("./routers/users/usersRouter");
const rateLimit = require("express-rate-limit");
const mainRouter = require("./routers/mainRouter");
const maingroupRouter = require("./routers/maingroup/maingroupRouter");
const passport = require("passport");
const passportConfig = require("./config/passportConfig");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("flash");
const morgan = require("morgan");
var cors = require("cors");
// const heroku = require("heroku");
const globalErrorHandler = require("./controllers/errorController");
const helmet = require("helmet");
const server = require("./server");
const compression = require("compression");
const commentRouter = require("./routers/comment/commentRouter");
const app = express();
require("colors");
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const multer = require("multer");

// app.use(helmet());

const limiter = rateLimit({
  max: 2500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use(express.json({ limit: "15kb" }));
app.use("/api", limiter);
app.use(express.static(path.join(__dirname, `public`)));
app.use(express.static(path.join(__dirname, `files`)));
// app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  console.log("development".blue);
  // app.use(morgan("dev"));
} else {
  // app.set("trust proxy", true);
  console.log("production".yellow);
}
app.use(compression());
app.use((req, res, next) => {
  if (!req.originalUrl.startsWith("/_next"))
    console.log("requesting ", req.originalUrl);
  req.requestTime = new Date().toISOString();

  next();
});

// app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 200000 },
    resave: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/roman",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/folder", folderRouter);
app.use("/api/v1/group", groupRouter);
app.use("/api/v1/main", mainRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/maingroup", maingroupRouter);
// app.all("/api/v1/*", (req, res, next) => {
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
