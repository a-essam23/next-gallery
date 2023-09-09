const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            lowercase: true,
            required: [true, "Every group must have a name!"],
            unique: [true, "Group name must be unique"],
            trim: true,
        },
        cover: {
            filename: {
                type: String,
                unique: [true, "This file was already uploaded"],
                required: [true, "Groups must have a cover"],
            },
            url: { type: String },
            path: { type: String },
        },
        active: { type: Boolean, default: true },
        childCount: {
            type: Number,
            default: 0,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            // required: true,
        },
        albums: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Album",
            },
        ],
        path: { type: String },
    },
    {
        timestamps: true,
    }
);

groupSchema.post("findOneAndDelete", function (doc) {
    if (!doc) return;
    // Remove the image from the associated album
    const Image = mongoose.model("Image");
    const Album = mongoose.model("Album");
    const Category = mongoose.model("Category");
    // remove group id from category
    Category.updateOne(
        { _id: doc.category },
        {
            $pull: { groups: doc._id },
            $inc: { childCount: -(doc.childCount + 1) },
        }
    ).then((res) => {
        console.log("Category updated");
    });

    // delete all albums in this group
    Album.deleteMany({ _id: { $in: doc.albums } }).then(() => {
        console.log("deleted all albums in", doc.name);
    });

    // delete all images in this group
    Image.deleteMany({ group: doc._id }).then(() => {
        console.log("deleted all images in", doc.name);
    });
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
