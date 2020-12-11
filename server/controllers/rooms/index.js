const { getRooms, createRoom } = require('../../database/queries/roomQueries');

exports.getUserRooms = async (req, res, next) => {
  try {
    const { id } = req.user;
    const rooms = await getRooms(id);
    if (rooms.length) {
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
