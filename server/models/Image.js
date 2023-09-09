const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            lowercase: true,
            required: [true, "Every image must have a name!"],
            // unique: [true, "Album must be unique"],
            trim: true,
        },
        code: {
            type: String,
            lowercase: true,
            // required: [true, "Every image must have a code!"],
            // unique: [true, "Album must be unique"],
        },
        dimensions: {
            length: Number,
            width: Number,
            depth: Number,
        },
        cover: {
            filename: {
                type: String,
                unique: [true, "This file was already uploaded"],
                required: [true, "Images must have a cover"],
            },
            url: { type: String },
            path: { type: String },
        },
        active: { type: Boolean, default: true },
        album: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Album",
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        path: { type: String },
    },
    {
        timestamps: true,
    }
);

imageSchema.post("findOneAndDelete", function (doc) {
    if (!doc) return;
    const Album = mongoose.model("Album");
    // Remove the image from the associated album
    Album.updateOne({ _id: doc.album }, { $pull: { images: doc._id } }).then(
        (res) => {
            console.log("Album updated");
        }
    );
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
