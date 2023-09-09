const {
    CategorySocketController,
    GroupSocketController,
    AlbumSocketController,
    ImageSocketController,
} = require("../socket_controllers");

const mainSocketRouter = (io, socket) => {
    socket.on("find_any", async (name, callback) => {
        try {
            if (!callback) return;
            const promises = [
                CategorySocketController.findByName(name),
                GroupSocketController.findByName(name),
                AlbumSocketController.findByName(name),
                ImageSocketController.findByName(name),
            ];
            const [categories, groups, albums, images] = await Promise.all(
                promises
            );
            callback({ categories, groups, albums, images });
        } catch (e) {
            throw new AppError(400, e.message);
        }
    });
};

module.exports = mainSocketRouter;
