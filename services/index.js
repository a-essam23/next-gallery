module.exports.getAll = (type = null) => {
    let { data, error } = payload;
    if (!type) {
        error = "Bad request: no type";
        return payload;
    }
};
// group = "api/v1/image?genre=Group&fields=-images,-__v,-Key,-comments";
// folder = "api/v1/image?genre=Folder&fields=-folders";
