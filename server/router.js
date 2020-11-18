const router = require('express').Router();
const { signup, activateUser, login } = require('./controllers');

router.post('/signup', signup);

router.get('/confirm/:userID', activateUser);

router.post('/login', login);

module.exports = router;
