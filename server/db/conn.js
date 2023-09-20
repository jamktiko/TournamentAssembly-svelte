const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});

async function connect() {
  try {
    await client.connect();
    console.log('Connection established');
  } catch {
    console.log('Connection failed');
  }
}

async function createData(text) {
  try {
    const db = await connectToMongoDB();
    const result = await db.collection('data').insertOne({ text });
    console.log('Data created successfully');
    return result.ops[0];
  } catch (error) {
    console.error('Error creating data:', error);
    throw error;
  }
}

// Function to fetch all data
async function getAll() {
  try {
    const db = await connectToMongoDB();
    const items = await db.collection('data').find().toArray();
    console.log('Fetched all data');
    return items;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Function to update data
async function updateData(id, text) {
  try {
    const db = await connectToMongoDB();
    await db.collection('data').findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { text } });
    console.log('Data updated successfully');
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
}

// Function to delete data
async function deleteData(id) {
  try {
    const db = await connectToMongoDB();
    await db.collection('data').deleteOne({ _id: new ObjectId(id) });
    console.log('Data deleted successfully');
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}

module.exports = { connect, createData, getAll, updateData, deleteData, client };
