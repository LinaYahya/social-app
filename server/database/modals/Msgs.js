const { Schema, model } = require('mongoose');

const MsgsSchema = new Schema({
  msg: {
    type: String,
    required: true,
  },
  receiverID: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  senderID: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model('Msgs', MsgsSchema);
