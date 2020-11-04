/* eslint-disable no-underscore-dangle */

const Msgs = require('../modals/Msgs');
const Users = require('../modals/Users');

module.exports = async () => {
  const [user1, user2] = await Users.find();
  const msgs = [
    {
      msg: 'hi',
      receiverID: user1._id,
      senderID: user2._id,
    },
    {
      msg: 'good morning',
      receiverID: user2._id,
      senderID: user1._id,
    },
  ];

  await Msgs.deleteMany({});
  await Msgs.create(msgs);
};
