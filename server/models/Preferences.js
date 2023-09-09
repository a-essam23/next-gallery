const mongoose = require("mongoose");

/*
    Category
    Collection
    Album
    Image
*/

const GenericPreferencesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            lowercase: true,
            required: [true, "Preferences must have a name"],
            unique: [true, "Preferences with this name already exists"],
        },
        options: {
            type: Object,
            of: mongoose.Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
    }
);

const Preferences = mongoose.model("Preferences", GenericPreferencesSchema);

module.exports = Preferences;
