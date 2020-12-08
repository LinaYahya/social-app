const Boom = require('@hapi/boom');
const { findFriends, addFriend, getUser } = require('../../database/queries/userQueries');
const { addFriendSchema } = require('../validation');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { friendID } = req.body;
    await addFriendSchema.validateAsync({ friendID });
    // check if friend exist
    const { friends } = await findFriends(id);
    const isFriendExist = friends.some(({ userID }) => String(userID) === friendID);

    if (isFriendExist) {
      throw Boom.badRequest('friend already exist');
    } else {
      // add friend to user database
      await addFriend(id, friendID);
      await addFriend(friendID, id);
      const user = await getUser(friendID);
      res.status(201).json({ msg: 'friend request sent successfully', user });
    }
  } catch (err) {
    if (err.message) {
      next(Boom.badRequest(err.message));
    } else {
      next(err);
    }
  }
};
