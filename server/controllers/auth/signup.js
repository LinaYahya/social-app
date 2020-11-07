const Boom = require('@hapi/boom');
const { hash } = require('bcrypt');
const { signupSchema } = require('../validation');
const {
  checkUserByEmail,
  createUser,
} = require('../../database/queries/userQueries');

const { sendMail } = require('../middleWare/sendMail');
const { sign } = require('../utils/jwt');

module.exports = async (req, res, next) => {
  try {
    const {
      name, password, repeatPassword, email,
    } = req.body;
    // validate request data
    await signupSchema.validateAsync(
      {
        name,
        password,
        repeatPassword,
        email,
      },
      { abortEarly: false },
    );
    // to check if there an account by this email
    const user = await checkUserByEmail(email);
    if (user.length) throw Boom.badRequest(`${user[0].email} not available!!`);
    // hash password then create user with active false
    const hashedPassword = await hash(password, 10);
    const { _id } = await createUser(name, email, hashedPassword);
    // create token by userID then send email by link will direct to activate this account
    const token = await sign({ id: _id }, '2 days');
    await sendMail(email, `http://localhost:5000/api/v1/confirm/${token}`);

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
