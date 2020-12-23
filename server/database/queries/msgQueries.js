const Msgs = require('../modals/Msgs');

exports.getRoomChatMsgs = (roomID, start) => Msgs.find({ roomID }, {}, { sort: { 'created_at' : -1} })
  .skip(start * 15)
  .limit(15)
  .populate('userID', 'name');

exports.createMsg = (msg, roomID, userID) => Msgs.create({ msg, roomID, userID });
