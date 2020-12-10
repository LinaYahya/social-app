/* eslint-disable no-underscore-dangle */

const Msgs = require('../modals/Msgs');
const Users = require('../modals/Users');
const Rooms = require('../modals/Rooms');

module.exports = async () => {
  const [user1, user2] = await Users.find();
  const [room1] = await Rooms.find();

  const msgs = [
    {
      msg: 'hi',
      roomID: room1._id,
      userID: user2._id,
    },
    {
      msg: 'good morning',
      roomID: room1._id,
      userID: user1._id,
    },
  ];

  await Msgs.deleteMany({});
  await Msgs.create(msgs);
};
