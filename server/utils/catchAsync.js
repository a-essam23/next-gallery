const fs = require("fs");

module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => {
            if (req?.file) {
                fs.unlink(req.file.path, (err) => err && console.log(err));
            }
            next(error);
        });
    };
};