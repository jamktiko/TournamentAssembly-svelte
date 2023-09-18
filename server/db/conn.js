const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

class MongoConnection {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("Database connection successfull!"))
      .catch(() => console.log("Database connection failed!"));
  }
}

module.exports = new MongoConnection();
