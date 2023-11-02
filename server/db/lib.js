const { connect, client } = require("./conn");
const { createToken } = require("./auth");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const Filter = require("bad-words");
const filter = new Filter();

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

  async loginUser(username, password) {
    const collection = client.db("touras").collection("users");

    if (!username || !password) {
      console.error("Username and password must be defined");
      return {
        msg: "Username and password must be defined",
        success: false,
      };
    }
    // Find the user by username
    const user = await collection.findOne({ username });
    try {
      if (!user) {
        console.error("User not found");
        return {
          msg: "Username wrong or not found",
          success: false,
        };
      }
    } catch (error) {
      console.error("Error finding user:", error);
      throw error;
    }
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match, user is authenticated
      return {
        id: user._id,
        username: user.username,
        tournaments: user.tournaments,
        token: createToken(user.username),
        success: true,
        msg: "Login successfull",
      };
    } else {
      console.error("Incorrect password");
      return {
        msg: "Incorrect password",
        success: false,
      };
    }
  },

  async registerUser(username, password, tournaments) {
    const collection = client.db("touras").collection("users");

    if (!username || !password) {
      console.error("Username or password must be defined");
      return {
        msg: "Username or password must be defined",
        success: false,
      };
    }

    // Validate that the username is a valid email address
    /*const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(username)) {
      console.error('Invalid email format');
      return {
        msg: 'Invalid email format',
        success: false,
      };
    }*/

    // Check for offensive words in the username
    if (filter.isProfane(username)) {
      console.error("Username contains inappropriate language");
      return {
        msg: "Username contains inappropriate language",
        success: false,
      };
    }

    // Check if the username is already taken
    const existingUser = await collection.findOne({ username });
    try {
      if (existingUser) {
        console.error("Username already exists");
        return {
          msg: "Username already exists",
          success: false,
        };
      }
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const token = createToken(username);

    // Insert the new user into the database
    await collection.insertOne({
      username: username,
      password: hashedPassword,
      tournaments: tournaments,
    });

    return { token: token, username: username, success: true };
  },

  async addTournament(username, newTournament) {
    const collection = client.db("touras").collection("users");

    // Find the user by username
    const user = await collection.findOne({ username: username });
    try {
      if (!user) {
        console.error("User not found");
        return {
          msg: "User not found",
          success: false,
        };
      }
    } catch (error) {
      console.error("Error finding user:", error);
      return {
        msg: "Error finding user",
        success: false,
      };
    }
    // Add newTournamentData to the tournament array

    user.tournaments.push(newTournament);

    // Update the user's document in the database
    const updateResult = await collection.updateOne(
      { username: username },
      { $set: { tournaments: user.tournaments } }
    );

    return { success: true, result: updateResult, msg: "Tournament created" };
  },

  async delTournament(username, id) {
    const collection = client.db("touras").collection("users");

    if (!username) {
      console.error("Username or tournament must be correct");
      return {
        msg: "Username or tournament must be correct",
        success: false,
      };
    }

    // Find the user by username
    const user = await collection.findOne({ username: username });
    try {
      if (!user) {
        console.error("User not found");
        return {
          msg: "User not found",
          success: false,
        };
      }
    } catch (error) {
      console.error("Error finding user:", error);
      throw error;
    }

    // Update the user's document in the database

    const updateResult = await collection.updateOne(
      { username: username, "tournaments.id": id },
      { $pull: { tournaments: { id: id } } }
    );

    console.log(updateResult);

    return updateResult;
  },

  async updateTournamentState(username, state, id) {
    const collection = client.db("touras").collection("users");

    if (!username || (id !== 0 && !id)) {
      console.error("Username or tournament id invalid");
      return {
        msg: "Username or tournament id invalid",
        success: false,
      };
    }

    console.log(state);

    try {
      await collection.findOneAndUpdate(
        { username: username, "tournaments.id": id },
        { $set: { "tournaments.$.state": state } }
      );
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  },

  // Function to update a document in a collection by ID
  async updateById(id, update) {
    const collection = client.db("touras").collection("users");

    try {
      await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: update }
      );
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  },

  // Function to delete a document in a collection by ID
  async deleteById(id) {
    const collection = client.db("touras").collection("users");

    try {
      await collection.deleteOne({ _id: new ObjectId(id) });
      console.log("Document deleted successfully", id);
      return {
        msg: "Document deleted successfully",
        success: true,
      };
    } catch (error) {
      console.error("Error deleting document:", error);
      return {
        msg: "Document deletion failed",
        success: false,
      };
    }
  },
};
module.exports = lib;
