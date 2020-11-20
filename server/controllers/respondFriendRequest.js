const Boom = require('@hapi/boom');
const { acceptFriendSchema } = require('./validation');
const { findFriends, updateFriends } = require('../database/queries/userQueries');

module.exports = async (req, res, next) => {
  try {
    const { friendID, respond } = req.body;
    const { id } = req.user;

    await acceptFriendSchema.validateAsync({ friendID, respond }, { abortEarly: false });
    let { friends } = await findFriends(id);
    const isFriendExist = friends.some(({ userID }) => String(userID) === friendID);

    if (isFriendExist) {
      if (respond === 'true') {
        friends = friends.map((friend) => {
          if (String(friend.userID) === friendID) {
            friend.status = 'true';
          }
          return friend;
        });
      } else {
        friends = friends.filter(({ userID }) => String(userID) !== friendID);
      }
      await updateFriends(id, friends);
      res.json({
        msg: 'update friend successfully',
      });
    } else {
      throw Boom.badRequest('friend not in friends list');
    }
  } catch (err) {
    if (err.message) {
      next(Boom.badRequest(err.message));
    } else {
      next(err);
    }
  }
};
