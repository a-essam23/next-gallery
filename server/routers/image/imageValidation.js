const Joi = require("joi");

exports.createImageValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required(),
      folder: Joi.string().required(),
      size: Joi.string().required(),
      genre: Joi.string().valid("image", "folder", "group").required(),
    }),
};

exports.updateImageValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string(),
      folder: Joi.string(),
      size: Joi.number(),
      genre: Joi.string().valid("image", "folder", "group"),
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
