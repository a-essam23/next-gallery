const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            lowercase: true,
            required: [true, "Every album must have a name!"],
            unique: [true, "Album name must be unique"],
            trim: true,
        },
        active: { type: Boolean, default: true },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        cover: {
            filename: {
                type: String,
                unique: [true, "This file was already uploaded"],
                required: [true, "Albums must have a cover"],
            },
            url: { type: String },
            path: { type: String },
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
        },
        images: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Image",
            },
        ],
        path: { type: String },
    },
    {
        timestamps: true,
    }
);

albumSchema.post("findOneAndDelete", function (doc) {
    if (!doc) return;
    // Remove the image from the associated album
    const Group = mongoose.model("Group");
    const Image = mongoose.model("Image");
    Group.updateOne(
        { _id: doc.group },
        {
            $pull: { albums: doc._id },
            $inc: { childCount: -(doc.images.length + 1) },
        }
    ).then((res) => {
        console.log("Group updated");
    });

    Image.deleteMany({ _id: { $in: doc.images } }).then(() => {
        console.log("deleted all images in", doc.name);
    });
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
