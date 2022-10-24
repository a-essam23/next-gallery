const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageCode: { type: String, required: true },
  },
  { timestamps: true }
);

commentSchema.pre(/^find/, function (next) {
  this.populate("createdBy", "name");
  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
