const { signup, activateUser, login } = require('./auth');
const {
  addFriend, respondFriendRequest, getFriends, getUsers,
} = require('./friends');

module.exports = {
  signup,
  activateUser,
  login,
  addFriend,
  respondFriendRequest,
  getFriends,
  getUsers,
};
