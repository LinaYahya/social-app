const router = require('express').Router();
const { signup, activateUser } = require('./controllers');

router.post('/signup', signup);

router.get('/confirm/:userID', activateUser);

module.exports = router;
