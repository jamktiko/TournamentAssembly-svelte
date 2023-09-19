const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '../.env' });

class MongoConnection {
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await client.connect();

      console.log('Database connection successful!');

      // You can access the MongoDB database through the 'client' object if needed.
      // Example: const db = client.db("your_database_name");

      // Close the client when you're done with it.
      // client.close();
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  }
}

module.exports = new MongoConnection();
