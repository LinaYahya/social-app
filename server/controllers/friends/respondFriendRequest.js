const Boom = require('@hapi/boom');
const { acceptFriendSchema } = require('../validation');
const { findFriends, updateFriends } = require('../../database/queries/userQueries');

const acceptFriend = (arr, id) => arr.map((friend) => {
  if (String(friend.userID) === id) {
    // eslint-disable-next-line no-param-reassign
    friend.status = 'true';
  }
  return friend;
});

module.exports = async (req, res, next) => {
  try {
    const { friendID, respond } = req.body;
    const { id } = req.user;
    // validate request body
    await acceptFriendSchema.validateAsync({ friendID, respond }, { abortEarly: false });

    // get friends list
    let { friends: userFriendList } = await findFriends(id);
    let { friends: friendFriendsList } = await findFriends(friendID);

    // check if friend request exist
    const isFriendExist = userFriendList.some(({ userID }) => String(userID) === friendID);

    if (isFriendExist) {
      if (respond === 'true') {
        userFriendList = acceptFriend(userFriendList, friendID); // update send request friendList
        friendFriendsList = acceptFriend(friendFriendsList, id); // update friend friendList
      } else {
        // remove friend if request denied
        userFriendList = userFriendList.filter(({ userID }) => String(userID) !== friendID);
        friendFriendsList = friendFriendsList.filter(({ userID }) => String(userID) !== id);
      }
      // update friends list
      await updateFriends(id, userFriendList);
      await updateFriends(friendID, friendFriendsList);

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
