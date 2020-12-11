const Rooms = require('../modals/Rooms');

exports.getRooms = (id) => Rooms.find({ users: id });
