var express = require("express");
var router = express.Router();
const { userController } = require("../db/controller");

router.get("/", userController.getAll);

router.post("/", userController.createData);

module.exports = router;
