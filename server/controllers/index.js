const { signup, activateUser, login } = require('./auth');
const { addFriend, respondFriendRequest } = require('./friends');

module.exports = {
  signup,
  activateUser,
  login,
  addFriend,
  respondFriendRequest,
};
