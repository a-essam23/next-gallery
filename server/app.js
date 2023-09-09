const path = require("path");
require("dotenv").config({
    path:
        process.env.NODE_ENV !== "production"
            ? path.join(process.cwd(), ".env.local")
            : path.join(process.cwd(), ".env.production"),
});
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const sessionMiddleware = require("./middleware/session");
const globalErrorHander = require("./middleware/globalErrorHandler");
app.use(cors());
app.use(sessionMiddleware);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

//* Prometheus setup
// const { responseTime, totalRequestCount } = require("./middleware/metrics");
// app.use(responseTime);w
// app.use(totalRequestCount);

// app.use((req, res, next) => {
//     req.io = io;
//     next();
// });


//* Routes setup
const category_routes = require("./routers/categoryrouter");
const group_routes = require("./routers/grouprouter");
const album_routes = require("./routers/albumrouter");
const image_routes = require("./routers/imagerouter");
const auth_routes = require("./routers/authrouter");
const preferences_routes = require("./routers/preferencesrouter");

app.use("/api/v1/category", category_routes);
app.use("/api/v1/group", group_routes);
app.use("/api/v1/album", album_routes);
app.use("/api/v1/image", image_routes);
app.use("/api/v1/auth", auth_routes);
app.use("/api/v1/preferences", preferences_routes);

app.use(globalErrorHander);
module.exports = app;
