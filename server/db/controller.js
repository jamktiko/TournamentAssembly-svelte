const { connect } = require("./conn");
const lib = require("./lib");

connect();

const userController = {
  async getAll(req, res) {
    res.send(await lib.getAll());
  },
};

module.exports = { userController };
