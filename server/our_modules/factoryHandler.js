const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.create = (Model) =>
  catchAsync(async (req, res, next) => {
    const newModel = await Model.create(req.body);

    res.status(201).json({
      status: "Creating new document has been successed!",
      data: {
        data: newModel,
      },
    });
  });
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with this ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //EXECUTE QUERY
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;
    // if (doc.length < 1) {
    //   return next(new AppError(`We couldn't find any results for your input`));
    // }
    // for (let i = 0; i < doc.length; i++) {

    // console.log(({ name: doc[i].Key } = doc));
    // }
    // const test = { name: doc[0].Key };
    // console.log(test);
    res.status(200).json({
      status: "success",
      results: doc.length,

      data: { doc },
    });
  });
exports.delete = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
exports.update = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.file);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });
