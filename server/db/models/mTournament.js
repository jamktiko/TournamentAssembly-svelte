const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organizer: { type: String, required: false },
  date: { type: Date, required: false },
  participants: { type: Array, required: true },
});

module.exports = TournamentSchema;
