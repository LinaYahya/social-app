const { signup, activateUser, login } = require('./auth');
const {
  addFriend, respondFriendRequest, getFriends, getUsers,
} = require('./friends');
const { getUserRooms, createRoom } = require('./rooms');
const { getMsgs } = require('./msgs');

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
  getMsgs,
};
