const Boom = require('@hapi/boom');
const { hash } = require('bcrypt');
const { signupSchema } = require('../validation');
const {
  checkUserByEmail,
  createUser,
} = require('../../database/queries/userQueries');

module.exports = async (req, res, next) => {
  try {
    const {
      name, password, repeatPassword, email,
    } = req.body;

    await signupSchema.validateAsync(
      {
        name,
        password,
        repeatPassword,
        email,
      },
      { abortEarly: false },
    );

    const user = await checkUserByEmail(email);

    if (user.length) throw Boom.badRequest(`${user[0].email} not available!!`);

    const hashedPassword = await hash(password, 10);

    await createUser(name, email, hashedPassword);

    res
      .status(201)
      .json({
        message:
          'signed up successfully, email sent you have to activate your account',
      });
  } catch (err) {
    next(err);
  }
};
