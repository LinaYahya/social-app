const Joi = require('@hapi/joi');

module.exports = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .message({ 'string.empty': 'email is a required field' }),
  name: Joi.string().required(),
  password: Joi.string().required().min(6),
  repeat_password: Joi.ref('password'),
});
