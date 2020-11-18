const Joi = require('@hapi/joi');

module.exports = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ 'string.empty': 'email is a required field' }),
  password: Joi.string().min(6).required(),
});
