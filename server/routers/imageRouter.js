// const express = require("express");
// const router = express.Router({ mergeParams: true });
// const imagesControllers = require("./../controllers/imagesControllers");
// const multerConfig = require("../config/multerConfig");
// const { restrictTo, isAuthMiddleware } = require("../middlewares/auth");
// const { resizeImage } = require("../middlewares/resizeImage");
// const commentRouter = require("./comment/commentRouter");

// // router.use(isAuthMiddleware);
// router.use("/:code/comments", commentRouter);
// router.route("/").get(imagesControllers.getAllImages);
// // router.route("/search").get(imagesControllers.searchAllImages);

// router.route("/upload").post(
//   multerConfig.imageUpload.any(),
//   // imagesControllers.setUserIds,
//   // resizeImage(200, 200),
//   imagesControllers.createImage
// );
// router.route("/test/:code").delete(imagesControllers.deleteOne);
// router
//   .route("/:code")
//   .get(imagesControllers.getOneImage)
//   .patch(imagesControllers.updateImage)
//   .delete(imagesControllers.deleteImages);

// module.exports = router;
