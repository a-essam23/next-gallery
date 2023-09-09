const { CategorySocketController } = require("../socket_controllers");
const AppError = require("../utils/appError");

const categorySocketRouter = (io, socket) => {
    socket.on("category_exists", async (name = null, callback) => {
        try {
            if (!callback) return;
            callback(await CategorySocketController.ifExists(name));
        } catch (e) {
            throw new AppError(400, e.message);
        }
    });
};

module.exports = categorySocketRouter;
