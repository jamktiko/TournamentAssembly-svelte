const { connect, client } = require('./conn');

const lib = {
  async getAll() {
    const collection = await client.db('touras').collection('users');

    try {
      const docs = await collection.find({}).toArray();
      return docs;
    } catch {
      console.log('Couldn´t get documents');
      return [];
    }
  },

  // Function to create a new document in a collection
  async createData(document) {
    const collection = client.db('touras').collection('users');

    try {
      const result = await collection.insertOne(document);
      console.log('Document created successfully');
      return result.ops[0];
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  },

  // Function to update a document in a collection by ID
  async updateById(users, id, update) {
    const collection = client.db('touras').collection('users');

    try {
      await collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: update });
      console.log('Document updated successfully');
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  },

  // Function to delete a document in a collection by ID
  async deleteById(users, id) {
    const collection = client.db('touras').collection('users');

    try {
      await collection.deleteOne({ _id: new ObjectId(id) });
      console.log('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  },
};
module.exports = lib;
