const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
  groups: { type: Array, required: false },
  matchResults: { type: Array, required: false },
  winners: { type: Array, required: false },
  rounds: { type: Array, required: false },
  teams: { type: Array, required: false },
});

// eslint-disable-next-line new-cap
module.exports = new mongoose.model('State', StateSchema);
