const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// eslint-disable-next-line new-cap
module.exports = new mongoose.model('User', UserSchema);
