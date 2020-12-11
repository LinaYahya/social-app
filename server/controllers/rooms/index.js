const { getRooms } = require('../../database/queries/roomQueries');

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
