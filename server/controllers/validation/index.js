const signupSchema = require('./signupSchema');
const loginSchema = require('./loginSchema');
const { acceptFriendSchema, addFriendSchema } = require('./friendSchema');

module.exports = {
  signupSchema,
  loginSchema,
  addFriendSchema,
  acceptFriendSchema,
};
