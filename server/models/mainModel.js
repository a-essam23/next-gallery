const mongoose = require("mongoose");
const Image = require("../models/imageModel");

const MainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
    },
    logo: {
      type: String,
    },
    groups: Array,
    images: Array,
    image: String,
    customers: Array,
    facebook: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    pinterest: {
      type: String,
    },
    data: [{ name: "", value: "", images: [] }],
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
