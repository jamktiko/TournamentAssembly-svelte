const mongoose = require('mongoose');

// config consists tournament configuration, how many players, how many points player can get from win etc.
// type is the tournament type that is chosen. Playoffs, groups, league or scoreboard.
// owner is the user who created the tournament.
// state consists in what is the current state in the tournament. For example in playoffs players are in the semifinal stage. All that data is stored and updated there.
const TournamentSchema = new mongoose.Schema({
  config: { type: Object, required: true },
  type: { type: String, required: true },
  owner: { type: String, required: true },
  state: { type: Object, required: false },
});

// eslint-disable-next-line new-cap
module.exports = new mongoose.model('Tournament', TournamentSchema);
