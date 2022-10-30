const router = require("express").Router({ mergeParams: true });
const commentController = require("../../controllers/commentController");
const { protect, restrictTo } = require("../../middlewares/auth");
const { validation } = require("../../middlewares/validation");
const validators = require("./commentValidation");

router.use(protect);

router.post(
  "/",
  validation(validators.createCommentValidation),
  restrictTo("user"),
  commentController.createComment
);

router.patch(
  "/:commentId",
  validation(validators.updateCommentValidation),
  restrictTo("user", "admin"),
  commentController.updateComment
);

router.get(
  "/:commentId",
  validation(validators.getCommentValidation),
  restrictTo("user", "admin"),
  commentController.getComment
);

router.get(
  "/",
  validation(validators.getAllCommentsValidation),
  restrictTo("user", "admin"),
  commentController.getAllComments
);

router.delete(
  "/:commentId",
  restrictTo("user", "admin"),
  commentController.deleteComment
);

module.exports = router;
