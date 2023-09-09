const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();
require("./server");
nextServer
    .prepare()
    .then(async (req, res) => {
        const app = require("./app");
        app.get("*", (req, res) => {
            return handle(req, res);
        });
    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });
