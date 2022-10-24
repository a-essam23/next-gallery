const router = require("express").Router({ mergeParams: true });
const commentController = require("../../controllers/commentController");
const { isAuthMiddleware } = require("../../middlewares/auth");
const { validation } = require("../../middlewares/validation");
const validators = require("./commentValidation");

router.use(isAuthMiddleware);

router.post(
  "/",
  validation(validators.createCommentValidation),
  commentController.createComment
);

router.patch(
  "/:commentId",
  validation(validators.updateCommentValidation),
  commentController.updateComment
);

router.get(
  "/:commentId",
  validation(validators.getCommentValidation),
  commentController.getComment
);

router.get(
  "/",
  validation(validators.getAllCommentsValidation),
  commentController.getAllComments
);

module.exports = router;
