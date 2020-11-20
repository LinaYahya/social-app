const router = require('express').Router();
const {
  signup, activateUser, login, addFriend,
} = require('./controllers');
const verifyUser = require('./controllers/middleWare/verifyUser');

router.post('/signup', signup);

router.get('/confirm/:userID', activateUser);

router.post('/login', login);

// end points for protected routes
router.use(verifyUser);

router.post('/addFriend', addFriend);

module.exports = router;
