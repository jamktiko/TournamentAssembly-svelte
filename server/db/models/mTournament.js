const mongoose = require("mongoose");
const ruleSchema = require("./mRules");

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organizer: { type: String, required: false },
  creationDate: { type: Date, required: true },
  participants: { type: Array, required: true },
  rules: ruleSchema,
});

module.exports = TournamentSchema;
