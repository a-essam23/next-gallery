const session = require("express-session");
const MongoStore = require("connect-mongo");

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // one month
    store: MongoStore.create({
        ttl: 7 * 24 * 60 * 60, // one week
        mongoUrl: process.env.MONGODB_URL,
    }),
});
module.exports = sessionMiddleware;
