const { signup, activateUser, login } = require('./auth');
const addFriend = require('./addFriend');
const respondFriendRequest = require('./respondFriendRequest');

module.exports = {
  signup,
  activateUser,
  login,
  addFriend,
  respondFriendRequest,
};
