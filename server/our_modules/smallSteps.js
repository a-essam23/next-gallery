exports.deleteFiles = () => {
  const dir = "./files/";

  readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
};
