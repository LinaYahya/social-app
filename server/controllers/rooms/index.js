/* eslint-disable no-param-reassign */
const { getRooms, createRoom } = require('../../database/queries/roomQueries');
const { getUser } = require('../../database/queries/userQueries');

exports.getUserRooms = async (req, res, next) => {
  try {
    const { id } = req.user;
    let rooms = await getRooms(id);
    if (rooms.length) {
      rooms = await Promise.all(rooms.map(async (room) => {
        if (room.users.length === 2) {
          const friendID = room.users.find((ele) => String(ele) !== id);
          const { name, avatar } = await getUser(friendID);
          room.name = name;
          room.avatar = avatar;
        }
        return room;
      }));
      res.json({ rooms });
    } else {
      res.status(404).json({ rooms, msg: 'no data found' });
    }
  } catch (err) {
    next(err);
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    const { name, users, avatar } = req.body;
    await createRoom(name, avatar, users);
    res.status(201).json({ msg: 'rooms created successfully' });
  } catch (err) {
    next(err);
  }
};
