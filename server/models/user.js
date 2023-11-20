const mongoose = require('mongoose');
// username has the name that the user has given to his/hers account and has to be unique.
// password is chosen by user and is hashed upon account creation.
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// eslint-disable-next-line new-cap
module.exports = new mongoose.model('User', UserSchema);
