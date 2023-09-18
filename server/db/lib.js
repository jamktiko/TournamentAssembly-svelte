const UserModel = require("./models/mUser");

async function getAll() {
  return await UserModel.find({});
}

async function getWithId(id) {
  return await UserModel.find({ _id: id });
}

module.exports = {
  getAll,
  getWithId,
};

// getAll().then((data) => console.log(data));
