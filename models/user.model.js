const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: Buffer,
  avatar_info: String,
});

module.exports = mongoose.model('Users', UserSchema);
