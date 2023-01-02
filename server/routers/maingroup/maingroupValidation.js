const Joi = require("joi");

exports.createMaingroupValidation = {
  body: Joi.object().required().keys({
    name: Joi.string().required(),
  }),
};

exports.getOneMaingroupValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
};

exports.updateMaingroupValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string(),
      genre: Joi.string().valid("maingroup"),
    }),
};

exports.deleteMaingroupValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
};

exports.hideMaingroupValidation = {
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
