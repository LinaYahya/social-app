const router = require('express').Router();
const {
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
  notFoundErrorHandler,
  serverErrorHandler,
} = require('./controllers');

const verifyUser = require('./controllers/middleWare/verifyUser');

router.post('/signup', signup);

router.get('/confirm/:userID', activateUser);

router.post('/login', login);

// end points for protected routes
router.use(verifyUser);

router.post('/friend', addFriend);

router.post('/respondRequest', respondFriendRequest);

router.get('/friends/:status', getFriends);

router.get('/users/:start', getUsers);

router.get('/rooms', getUserRooms);

router.post('/room', createRoom);

router.get('/msgs/:chatID/:start', getMsgs);

router.use([notFoundErrorHandler, serverErrorHandler]);

module.exports = router;
