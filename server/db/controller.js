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

  async loginUser(req, res) {
    res.send(await lib.loginUser(req.body.username, req.body.password));
  },

  async registerUser(req, res) {
    res.send(await lib.registerUser(req.body.username, req.body.password));
  },
};

module.exports = { userController };
