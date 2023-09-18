require("../conn.js");
const mongoose = require("mongoose");
const TournamentSchema = require("./mTournament");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
  tournaments: [TournamentSchema],
});

module.exports = new mongoose.model("User", UserSchema);
