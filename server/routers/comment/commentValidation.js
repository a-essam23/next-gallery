const Joi = require("joi");

exports.createCommentValidation = {
  body: Joi.object().required().keys({
    content: Joi.string().required(),
  }),
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
};

exports.updateCommentValidation = {
  body: Joi.object().required().keys({
    content: Joi.string().required(),
  }),
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
};

exports.getCommentValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
};

exports.getAllCommentsValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
};
