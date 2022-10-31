const Joi = require("joi");

exports.signupValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      cPassword: Joi.valid(Joi.ref("password")).required(),
      role: Joi.string().valid("user", "data-entry", "admin"),
    }),
};

exports.loginValidation = {
  body: Joi.object().required().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
