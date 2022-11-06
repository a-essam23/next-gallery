const mongoose = require("mongoose");
const Image = require("../models/imageModel");

const MainSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
        },
        title: String,
        logo: String,
        groups: Array,
        images: Array,
        image: String,
        customers: Array,
        facebook: String,
        whatsapp: String,
        pinterest: String,
        data: { type: Map, of: Object },
    },
    {
        timestamps: true,
    }
);

MainSchema.pre("save", async function (req, res, next) {
    const imagesPromises = this.images.map(
        async (id) => await Image.findById(id)
    );
    this.images = await Promise.all(imagesPromises);
    this.customers = await Promise.all(imagesPromises);

    next();
});
const Main = mongoose.model("Main", MainSchema);

module.exports = Main;
