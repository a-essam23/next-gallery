const Joi = require("joi");

exports.createUnitValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required(),
      product: Joi.string().required(),
      size: Joi.string().required(),
      genre: Joi.string().valid("unit", "product", "collection").required(),
      // active: Joi.string().required(),
    }),
};

exports.updateUnitValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string(),
      product: Joi.string(),
      size: Joi.number(),
      genre: Joi.string().valid("unit", "product", "collection"),
    }),
  params: Joi.object()
    .required()
    .keys({
      code: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
};
exports.hideUnitValidation = {
  body: Joi.object().required().keys({
    active: Joi.boolean(),
  }),
  params: Joi.object()
    .required()
    .keys({
      code: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
};
exports.deleteUnitValidation = {
  params: Joi.object()
    .required()
    .keys({
      code: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
};

exports.getOneUnitValidation = {
  params: Joi.object()
    .required()
    .keys({
      code: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
};
