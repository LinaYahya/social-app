const { Schema, model, models } = require('mongoose');

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'lm3xruk5amec1b9ax0j2.png',
  },
  users: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
  },
});

module.exports = models.Rooms || model('Rooms', roomSchema);
