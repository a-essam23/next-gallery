import session, { Session as Session_, SessionData } from "express-session";
import MongoStore from "connect-mongo";
import { IUserPublic } from "@models/user-model";
import { IPopoulateMap } from "@factory/controller-factory/types";
declare module "express-session" {
    interface SessionData {
        user?: IUserPublic;
    }
}

declare module "http" {
    interface IncomingMessage {
        session: SessionData & Session_;
    }
}

declare module "express" {
    interface Request {
        populate?: IPopoulateMap;
    }
}


export const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // one month
    store: MongoStore.create({
        ttl: 7 * 24 * 60 * 60, // one week
        mongoUrl: process.env.MONGODB_URL,
    }),
});
