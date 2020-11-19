const Users = require('../modals/Users');

exports.checkUserByEmail = (email) => Users.find({ email });

exports.createUser = (name, email, password) => Users.create({ name, email, password });

exports.activateAccount = (_id) => Users.updateOne({ _id }, { active: true });

exports.findFriends = (_id) => Users.findOne({ _id }, 'friends');

exports.addFriend = (_id, userID) => Users.updateOne({ _id }, { $push: { friends: { userID } } });

exports.deleteFriend = (_id, friends) => Users.updateOne({ _id }, { friends });
