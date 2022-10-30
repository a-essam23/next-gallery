exports.deleteFiles = () => {
  const dir = "./files/";

  readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
};

exports.resize = async function () {
  const image = await Jimp.read(
    dirname(require.main.filename) + `/files/${req.files[0].originalname}`
  );

  image
    .resize(300, 300, Jimp.RESIZE_BEZIER, function (err) {
      if (err) throw err;
    })
    .write(`./server/files/small/${req.files[0].originalname}`);
  console.log("done");
};

resize();
