const UserModel = require('./models/mUser');

const usersCollection = 'users';
const collection = touras.db().collection(usersCollection);

async function getAll() {
  return await usersCollection.find({});
}

async function getWithId(id) {
  return await usersCollection.find({ _id: id });
}

async function getOne() {
  return await usersCollection.findOne({});
}

async function deleteOne() {
  return await usersCollection.deleteOne({});
}

async function addTournament() {
  return await usersCollection.insertOne({});
}

module.exports = {
  getAll,
  getWithId,
  getOne,
  deleteOne,
  addTournament,
};

// getAll().then((data) => console.log(data));
