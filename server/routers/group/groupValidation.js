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
};
