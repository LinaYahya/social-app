const Users = require('../modals/Users');

exports.checkUserByEmail = (email) => Users.find({ email });

exports.createUser = (name, email, password) => Users.create({ name, email, password });