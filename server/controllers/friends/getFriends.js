const Boom = require('@hapi/boom');
const {
  findFriends,
  getUser,
  getUsers,
} = require('../../database/queries/userQueries');

const getFriendsData = async (arr, state) => {
  const friendsList = arr.filter(
    ({ status: friendStatus }) => friendStatus === state,
  );
  const list = await Promise.all(
    friendsList.map(async ({ userID }) => {
      const user = await getUser(userID);
      return user;
    }),
  );
  return list;
};

exports.getFriends = async (req, res, next) => {
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

exports.getUsers = async (req, res, next) => {
  try {
    const { start } = req.params;
    const { id } = req.user;

    if (Number(start) || start === '0') {
      let users = await getUsers(start);
      const { friends } = await getUser(id);
      if (users.length) {
        users = users.filter(
          ({ _id }) => (
            !friends.find(({ userID }) => String(userID) === String(_id))
          ) && !(String(id) === String(_id)),
        );
        res.json({ users });
      } else {
        res.status(404).json({ msg: 'no users found' });
      }
    } else {
      throw Boom.badRequest('start should be a number');
    }
  } catch (err) {
    next(err);
  }
};
