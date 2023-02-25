const Joi = require("joi");

exports.createGroupValidation = {
  body: Joi.object().required().keys({
    name: Joi.string().required(),
  }),
};

exports.getOneGroupValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
};

exports.updateGroupValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string(),
      genre: Joi.string().valid("group"),
    }),
};

exports.deleteGroupValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
};

exports.hideGroupValidation = {
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
