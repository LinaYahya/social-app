const Boom = require('@hapi/boom');
const { verify } = require('../utils/jwt');

module.exports = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const { id } = await verify(token);
      if (id) {
        req.user = { id };
        next();
      } else {
        throw Boom.unauthorized('unauthorized for this action');
      }
    } else {
      throw Boom.unauthorized('unauthorized for this action');
    }
  } catch (err) {
    next(err);
  }
};
