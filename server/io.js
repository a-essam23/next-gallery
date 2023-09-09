const { Server } = require("socket.io");
const sessionMiddleware = require("./middleware/session");

const wrap = (middleware) => (socket, next) =>
    middleware(socket.request, {}, next);

const IO = (server) => {
    const io = new Server(server);
    io.use(wrap(sessionMiddleware));
    io.on("connection", async (socket) => {
        // console.info({
        //     message: `${socket.id} has connected`,
        //     labels: {
        //         task: "socket",
        //         operation: "connection",
        //     },
        // });
        socket.onAny((eventName, ...args) => {
            console.info({
                message: `EVENT EMITTED ${eventName}`,
                labels: { task: "event" },
            });
        });

        //* Socket routes setup
        const main_sockets = require("./socket_routers");
        main_sockets(io, socket);
        const category_sockets = require("./socket_routers/category_socket_router");
        category_sockets(io, socket);

        socket.on("disconnect", async (reason) => {
            try {
                const session = socket.request.session;

                // console.info({
                //     message: `${socket.id} has disconnected`,
                //     labels: {
                //         task: "socket",
                //         operation: "connection",
                //     },
                // });
            } catch (e) {
                console.error(e);
            }
        });
    });

    return io;
};

module.exports = IO;
