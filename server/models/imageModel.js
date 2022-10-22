const mongoose = require("mongoose");
const AppError = require("../utils/appError");
const slugify = require("slugify");
const imageSchema = new mongoose.Schema({
    Key: {
        type: String,
        required: true,
        unique: [true, "Key must be unique"],
        // select: false,
    },
    slug: String,
    code: {
        type: String,
        lowercase: true,
        required: [true, "every image must have a code!"],
        unique: [true, "Code must be unique"],
    },
    small300x300: {
        type: String,
    },
    originalSize: {
        type: String,
    },
    folderCategory: {
        type: String,
    },
    folderName: {
        type: String,
    },
    groupCategory: {
        type: String,
    },
    size: {
        type: String,
    },
    groupName: {
        type: String,
    },
    images: {
        type: Array,
    },
    folders: {
        type: Array,
    },
    genre: {
        type: String,
        required: true,
        default: "Image",
        enum: ["Image", "Folder", "Group"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: true,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        select: true,
    },
});
imageSchema.pre(/^find/, function (next) {
    console.log(this.genre);
    this.populate({
        path: "createdBy",
        select: "name",
    });
    next();
});
imageSchema.pre("save", function (next) {
    this.slug = slugify(this.Key, { lower: true });
    // console.log(this);
    next();
});
const Image = mongoose.model("Image", imageSchema);
// Image.syncIndexes();
module.exports = Image;
