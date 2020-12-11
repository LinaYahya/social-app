const { signup, activateUser, login } = require('./auth');
const {
  addFriend, respondFriendRequest, getFriends, getUsers,
} = require('./friends');
const { getUserRooms, createRoom } = require('./rooms');

module.exports = {
  signup,
  activateUser,
  login,
  addFriend,
  respondFriendRequest,
  getFriends,
  getUsers,
  getUserRooms,
  createRoom,
};
