const Boom = require('@hapi/boom');
const { activateAccount } = require('../../database/queries/userQueries');
const { verify, sign } = require('../utils/jwt');

module.exports = async (req, res, next) => {
  try {
    const { userID } = req.params;
    // decode token then activate account
    const { id } = await verify(userID);
    const { ok } = await activateAccount(id);
    if (ok) {
      // send cookie by response
      const token = await sign(id);
      res.cookie('token', token);
      res.json({ message: 'your account activated' });
    } else {
      throw Boom.badRequest("can't activate your account");
    }
  } catch (err) {
    next(err);
  }
};
