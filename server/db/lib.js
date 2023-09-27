const { connect, client } = require('./conn');
const { createToken } = require('./auth');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

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

  async loginUser(username, password) {
    const collection = client.db('touras').collection('users');

    // Find the user by username
    const user = await collection.findOne({ username });
    try {
      if (!user) {
        console.error('User not found');
        return {
          msg: 'Username wrong or not found',
          success: false,
        };
      }
      console.log(user);
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match, user is authenticated
      return { username: user.username };
    } else {
      console.error('Incorrect password');
      return {
        msg: 'Incorrect password',
        success: false,
      };
    }
  },

  async registerUser(username, password, tournament) {
    const collection = client.db('touras').collection('users');

    // Check if the username is already taken
    const existingUser = await collection.findOne({ username });
    try {
      if (existingUser) {
        console.error('Username already exists');
        return {
          msg: 'Username already exists',
          success: false,
        };
      }
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const token = createToken(username);

    // Insert the new user into the database
    const result = await collection.insertOne({
      username: username,
      password: hashedPassword,
      tournament: tournament,
      token: token,
    });

    return result;
  },

  async addTournament(username, newTournament) {
    const collection = client.db('touras').collection('users');

    // Find the user by username
    const user = await collection.findOne({ username: username });
    try {
      if (!user) {
        console.error('User not found');
        return {
          msg: 'User not found',
          success: false,
        };
      }
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
    // Add newTournamentData to the tournament array
    user.tournament.push(newTournament);

    // Update the user's document in the database
    const updateResult = await collection.updateOne({ username: username }, { $set: { tournament: user.tournament } });

    return updateResult;
  },

  async delTournament(username, delData) {
    const collection = client.db('touras').collection('users');

    // Find the user by username
    const user = await collection.findOne({ username: username });
    try {
      if (!user) {
        console.error('User not found');
        return {
          msg: 'User not found',
          success: false,
        };
      }
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }

    // Update the user's document in the database
    const updateResult = await collection.updateOne({ username: username }, { $pull: { tournament: delData } });

    return updateResult;
  },

  // Function to update a document in a collection by ID
  async updateById(id, update) {
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
  async deleteById(id) {
    const collection = client.db('touras').collection('users');

    try {
      await collection.deleteOne({ _id: new ObjectId(id) });
      console.log('Document deleted successfully', id);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  },
};
module.exports = lib;
