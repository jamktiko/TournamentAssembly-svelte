const mongoose = require('mongoose');
const StateSchema = require('./state');
const ConfigSchema = require('./config');

const TournamentSchema = new mongoose.Schema({
  config: { type: [ConfigSchema], required: true },
  id: { type: Number, required: true },
  type: { type: String, required: true },
  state: { type: [StateSchema], required: false },
});

// eslint-disable-next-line new-cap
module.exports = new mongoose.model('Tournament', TournamentSchema);
