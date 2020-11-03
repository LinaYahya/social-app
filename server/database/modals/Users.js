const { Schema, model } = require('mongoose');

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
  friends: {
    type: [{
      status: {
        type: String,
        default: 'pending',
      },
      userID: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    }],
  },
});

module.exports = model('Users', userSchema);
