const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
  config: { type: Object, required: true },
  type: { type: String, required: true },
  owner: { type: String, required: true },
  state: { type: Object, required: false },
});

// eslint-disable-next-line new-cap
module.exports = new mongoose.model('Tournament', TournamentSchema);
