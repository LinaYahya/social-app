const Boom = require('@hapi/boom');
const { findFriends, getUser } = require('../../database/queries/userQueries');

const getFriendsData = async (arr, state) => {
  const friendsList = arr.filter(({ status: friendStatus }) => friendStatus === state);
  const list = await Promise.all(friendsList.map(async ({ userID }) => {
    const user = await getUser(userID);
    return user;
  }));
  return list;
};

module.exports = async (req, res, next) => {
  try {
    const { status } = req.params;
    const { id } = req.user;
    const { friends } = await findFriends(id);

    switch (status) {
      case 'pending': {
        const list = await getFriendsData(friends, 'pending');
        res.json({ list });
        break;
      }
      case 'friends': {
        const list = await getFriendsData(friends, 'true');
        res.json({ list });
        break;
      }
      default: {
        throw Boom.badRequest('route not exist');
      }
    }
  } catch (err) {
    next(err);
  }
};
