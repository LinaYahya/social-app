const { Schema, model, models } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'lm3xruk5amec1b9ax0j2.png',
  },
  active: {
    type: Boolean,
    default: false,
  },
  friends: {
    type: [new Schema({
      status: {
        type: String,
        default: 'pending',
      },
      userID: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    }, { _id: false })],
  },
});

module.exports = models.Users || model('Users', userSchema);
