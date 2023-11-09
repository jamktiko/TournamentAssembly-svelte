const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
  tournamentName: { type: String, required: true },
  organizerName: { type: String, required: true },
  numberOfGroups: { type: String, required: false },
  teamsInGroup: { type: String, required: false },
  tourDecider: { type: String, required: false },
  pointsPerWin: { type: Number, required: false },
  pointsPerDraw: { type: Number, required: false },
  numberOfRounds: { type: String, required: false },
  bestOf: { type: String, required: false },
  players: { type: Array, required: false },
  advance: { type: Number, required: false },
  id: { type: Number, required: true },
});

// eslint-disable-next-line new-cap
module.exports = new mongoose.model('Config', ConfigSchema);
