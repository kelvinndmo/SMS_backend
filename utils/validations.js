const Joi = require("@hapi/joi");

const registerValidation = body => {
  const schema = Joi.object({
    first_name: Joi.string()
      .min(3)
      .required(),
    last_name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(5)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .required()
  });

  return schema.validate(body);
};

const loginValidator = body => {
  const schema = Joi.object({
    email: Joi.string()
      .min(3)
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .required()
  });

  return schema.validate(body);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidator = loginValidator;
