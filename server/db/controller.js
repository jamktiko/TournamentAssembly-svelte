const { connect } = require("./conn");
const lib = require("./lib");

connect();

const userController = {
  async getAll(req, res) {
    res.send(await lib.getAll());
  },

  async createData(req, res) {
    res.send(await lib.createData(req.body));
  },

  async deleteById(req, res) {
    res.send(await lib.deleteById(req.body.id));
  },
};

module.exports = { userController };
