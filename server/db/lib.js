const { connect, client } = require("./conn");

const lib = {
  async getAll() {
    const collection = await client.db("touras").collection("users");

    try {
      const docs = await collection.find({}).toArray();
      return docs;
    } catch {
      console.log("Couldn´t get documents");
      return [];
    }
  },
};

module.exports = lib;
