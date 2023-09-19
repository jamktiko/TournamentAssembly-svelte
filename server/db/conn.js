const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

console.log(process.env.MONGODB_URI);

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});

async function connect() {
  try {
    await client.connect();
    console.log("Connection established");
  } catch {
    console.log("Connection failed");
  }
}

module.exports = { connect, client };
