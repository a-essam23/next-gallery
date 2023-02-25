const Joi = require("joi");

exports.createProductValidation = {
  body: Joi.object().required().keys({
    name: Joi.string().required(),
    category: Joi.string().required(),
    active: Joi.string().required(),
  }),
};

exports.getOneProductValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
};

exports.updateOneProductValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
  body: Joi.object().required().keys({
    size: Joi.string(),
    name: Joi.string(),
    group: Joi.string(),
  }),
};

exports.deleteProductValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
};

exports.hideProductValidation = {
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
