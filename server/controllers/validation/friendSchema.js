const Joi = require('@hapi/joi');

exports.addFriendSchema = Joi.object({
  friendID: Joi.string().required(),
});

exports.acceptFriendSchema = Joi.object({
  friendID: Joi.string().required(),
  respond: Joi.boolean().required(),
});
