const Boom = require('@hapi/boom');
const { findFriends, addFriend } = require('../database/queries/userQueries');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { friendID } = req.body;
    // check if friend exist
    const { friends } = await findFriends(id);
    const isFriendExist = friends.some(({ userID }) => String(userID) === friendID);

    if (isFriendExist) {
      throw Boom.badRequest('friend already exist');
    } else {
      // add friend to user database
      await addFriend(id, friendID);
      res.status(201).json({ msg: 'friend request sent successfully' });
    }
  } catch (err) {
    next(err);
  }
};
