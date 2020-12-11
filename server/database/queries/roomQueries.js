const Rooms = require('../modals/Rooms');

exports.getRooms = (id) => Rooms.find({ users: id });

exports.createRoom = (name, avatar, users) => Rooms.create({ name, avatar, users });

exports.findRooms = () => Rooms.find();
