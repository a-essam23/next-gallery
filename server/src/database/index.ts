import path from "path";
import { config } from "dotenv";
config({
    path:
        process.env.NODE_ENV !== "production"
            ? path.join(process.cwd(), ".env.local")
            : path.join(process.cwd(), ".env.production"),
});
import mongoose from "mongoose";
import { log } from "@utils/logger";

export function connect(callback: () => any) {
    mongoose.connect(process.env.MONGODB_URL!).then(() => {
        log.info("DB connected!", { task: "db" });
        callback();
    });
}
