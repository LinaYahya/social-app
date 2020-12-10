const { Schema, model, models } = require('mongoose');

const roomSchema = new Schema({
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
