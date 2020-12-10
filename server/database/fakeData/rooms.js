/* eslint-disable no-underscore-dangle */
const Users = require('../modals/Users');
const Rooms = require('../modals/Rooms');

module.exports = async () => {
  const [user1, user2] = await Users.find();

  await Rooms.deleteMany({});
  await Rooms.create({
    name: 'gossip',
    users: [user1._id, user2._id],
  });
};
