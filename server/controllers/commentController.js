const Comment = require("../models/commentModel");
const Image = require("../models/imageModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createComment = catchAsync(async (req, res, next) => {
  const { content } = req.body;
  const newComment = new Comment({
    content,
    createdBy: req.user._id,
    imageCode: req.params.code,
  });
  const savedComment = await newComment.save();
  const image = await Image.findByIdAndUpdate(
    req.params.imageId,
    { $push: { comments: savedComment } },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    data: savedComment,
  });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    return next(new AppError("no comment found with this id", 404));
  }
  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.commentId,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: updatedComment,
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    return next(new AppError("no comment found with this id", 404));
  }
  const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
  res.status(200).json({
    status: "success",
  });
});

exports.getComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    return next(new AppError("no comment found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: comment,
  });
});

exports.getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({ imageCode: req.params.code });
  res.status(200).json({
    status: "success",
    data: comments,
  });
});
