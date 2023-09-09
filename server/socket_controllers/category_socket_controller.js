const Category = require("../models/Category");

module.exports.findByName = async (name) => {
    try {
        const findInCategory = await Category.find({
            name: { $regex: name, $options: "i" },
        });
        return findInCategory;
    } catch (e) {
        return [];
    }
};

module.exports.ifExists = async (name) => {
    let res = await this.findByName(name);
    return res.length ? true : false;
};
