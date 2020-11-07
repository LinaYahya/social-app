const router = require('express').Router();
const { signup } = require('./controllers');

router.post('/signup', signup);

module.exports = router;
