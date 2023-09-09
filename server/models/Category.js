const mongoose = require("mongoose");

/*
    Category
    Collection
    Album
    Image
*/

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            lowercase: true,
            required: [true, "Categories must have a name"],
            unique: [true, "Category name must be unique"],
            trim: true,
        },
        cover: {
            filename: {
                type: String,
                unique: [true, "This file was already uploaded"],
                required: [true, "Category must have a cover"],
            },
            url: { type: String },
            path: { type: String },
        },
        childCount: {
            type: Number,
            default: 0,
        },
        active: { type: Boolean, default: true },
        groups: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Group",
            },
        ],
    },
    {
        timestamps: true,
    }
);

categorySchema.post("findOneAndDelete", function (doc) {
    if (!doc) return;
    // Remove the image from the associated album
    const Image = mongoose.model("Image");
    const Album = mongoose.model("Album");
    const Group = mongoose.model("Group");
    // delete all groups in this category
    Group.deleteMany({ _id: { $in: doc.groups } }).then(() => {
        console.log("deleted all groups in", doc.name);
    });

    // delete all albums in this group
    Album.deleteMany({ category: doc._id }).then(() => {
        console.log("deleted all albums in", doc.name);
    });

    // delete all images in this group
    Image.deleteMany({ category: doc._id }).then(() => {
        console.log("deleted all images in", doc.name);
    });
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
