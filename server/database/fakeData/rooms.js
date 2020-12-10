const Users = require('../modals/Users');
const Rooms = require('../modals/Rooms');

module.exports = async () => {
  const [user1, user2] = await Users.find();

  await Rooms.deleteMany({});
  await Rooms.create({
    users: [user1, user2],
  });
};
