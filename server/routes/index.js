var express = require("express");
var router = express.Router();
const { verifyToken } = require("../db/auth");
const { userController } = require("../db/controller");

router.get("/", userController.getAll);

router.post("/login", userController.loginUser);

router.post("/register", userController.registerUser);

router.post("/addTour", verifyToken, userController.addTournament);

router.post("/", userController.createData);

router.delete("/", verifyToken, userController.deleteById);

router.delete("/delTour", verifyToken, userController.delTournament);

module.exports = router;
