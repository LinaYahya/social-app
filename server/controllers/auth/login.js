const Boom = require('@hapi/boom');
const { compare } = require('bcrypt');
const { checkUserByEmail } = require('../../database/queries/userQueries');
const { loginSchema } = require('../validation');
const { sign } = require('../utils/jwt');

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check request body
    await loginSchema.validateAsync({
      email, password,
    });
    // check if user exist
    const user = await checkUserByEmail(email);
    if (user.length) {
      const { _id: id, password: hashedPassword } = user[0];
      // check if password correct using bcrypt compare
      const isCorrectPW = await compare(password, hashedPassword);
      if (isCorrectPW) {
        const token = await sign({ id });
        res.cookie('token', token);
        res.end();
      } else {
        throw Boom.unauthorized('invalid password');
      }
    } else {
      throw Boom.badRequest('email not exist, signup first');
    }
  } catch (err) {
    if (err.message) {
      next(Boom.badRequest(err.message));
    } else {
      next(err);
    }
  }
};
