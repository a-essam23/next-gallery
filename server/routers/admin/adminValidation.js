const Joi = require("joi");

exports.updateUserValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
      facebookId: Joi.string(),
      googleId: Joi.string(),
      role: Joi.string().valid("user", "data-entry", "admin"),
      active: Joi.boolean(),
    }),
};
