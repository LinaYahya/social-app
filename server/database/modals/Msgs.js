const { Schema, model, models } = require('mongoose');

const MsgsSchema = new Schema({
  msg: {
    type: String,
    required: true,
  },
  roomID: {
    type: Schema.Types.ObjectId,
    ref: 'Rooms',
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = models.Msgs || model('Msgs', MsgsSchema);
