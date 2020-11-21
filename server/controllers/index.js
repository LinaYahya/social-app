const { signup, activateUser, login } = require('./auth');
const { addFriend, respondFriendRequest, getFriends } = require('./friends');

module.exports = {
  signup,
  activateUser,
  login,
  addFriend,
  respondFriendRequest,
  getFriends,
};
