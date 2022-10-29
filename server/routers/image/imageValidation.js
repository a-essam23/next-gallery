const Joi = require("joi");

exports.createImageValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required(),
      folder: Joi.string().required(),
      size: Joi.string().required(),
      genre: Joi.string().valid("Image", "Folder", "Group").required(),
    }),
};

exports.updateImageValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string(),
      folder: Joi.string(),
      size: Joi.string(),
      genre: Joi.string().valid("Image", "Folder", "Group"),
    }),
  params: Joi.object()
    .required()
    .keys({
      code: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
};

exports.deleteImageValidation = {
  params: Joi.object()
    .required()
    .keys({
      code: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
};

exports.getOneImageValidation = {
  params: Joi.object()
    .required()
    .keys({
      code: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
};
