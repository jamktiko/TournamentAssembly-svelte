const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connection successful");
  } catch {
    console.log("Connection failed");
  }
}

module.exports = { connectToMongoDB, client };
