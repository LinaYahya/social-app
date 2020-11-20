const Boom = require('@hapi/boom');
const { acceptFriendSchema } = require('./validation');
const { findFriends, updateFriends } = require('../database/queries/userQueries');

module.exports = async (req, res, next) => {
  try {
    const { friendID, respond } = req.body;
    const { id } = req.user;
    // validate request body
    await acceptFriendSchema.validateAsync({ friendID, respond }, { abortEarly: false });
    // get friends list
    let { friends } = await findFriends(id);
    // check if friend request exist
    const isFriendExist = friends.some(({ userID }) => String(userID) === friendID);

    if (isFriendExist) {
      if (respond === 'true') {
        // change status to true if accept friend
        friends = friends.map((friend) => {
          if (String(friend.userID) === friendID) {
            // eslint-disable-next-line no-param-reassign
            friend.status = 'true';
          }
          return friend;
        });
      } else {
        // remove friend if request denied
        friends = friends.filter(({ userID }) => String(userID) !== friendID);
      }
      // update friends list
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
