const Joi = require("joi");

exports.createCategoryValidation = {
  body: Joi.object().required().keys({
    name: Joi.string().required(),
    group: Joi.string().required(),
  }),
};

exports.getOneCategoryValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
};

exports.updateCategoryValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string(),
      genre: Joi.string().valid("category"),
    }),
};

exports.deleteCategoryValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
};

exports.hideCategorysValidation = {
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
