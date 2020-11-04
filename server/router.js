const router = require('express').Router();
const { signup } = require('./controllers');

router.get('/signup', signup);

module.exports = router;
