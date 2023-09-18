const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organizer: { type: String, required: false },
  creationDate: { type: Date, required: true },
  participants: { type: Array, required: true },
});

module.exports = TournamentSchema;
