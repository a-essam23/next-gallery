const Comment = require("../models/commentModel");
const Image = require("../models/imageModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createComment = catchAsync(async (req, res, next) => {
  const { content } = req.body;
  const newComment = new Comment({
    content,
    createdBy: req.user._id,
    imageCode: req.params.code,
  });
  console.log(req.params);
  const savedComment = await newComment.save();
  const image = await Image.findOneAndUpdate(
    { name: req.params.code },
    { $push: { comments: savedComment._id } },
    { new: true }
  );
  res.status(200).json({
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
  const image = await Image.findOneAndUpdate(
    { name: req.params.code },
    { $pull: { comments: comment._id } },
    { new: true }
  );
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
  const apiFeatures = new APIFeatures(
    Comment.find({ imageCode: req.params.code }),
    req.query
  )
    .filter()
    .limitFields()
    .paginate()
    .sort();
  const comments = await apiFeatures.query;
  res.status(200).json({
    status: "success",
    data: comments,
  });
});
