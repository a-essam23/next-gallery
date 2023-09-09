const uploadOne = async (req, item) => {
    try {
        const form = new FormData();
        const fileData = fs.readFileSync(req.file.path); // Read the file data
        const blob = new Blob([fileData], {
            type: req.file.mimetype,
        }); // Create a Blob object from the file data
        form.append("image", blob, req.file.originalname);
        const response = await axios.post(
            "https://api.imgur.com/3/upload",
            form,
            {
                headers: {
                    Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
                },
            }
        );
        item.cover.url = response.data.data.link;
    } catch (e) {
        console.log("e.data", e);
        next(new AppError(e.reponse?.status, e));
    }
};

module.exports = { uploadOne };
