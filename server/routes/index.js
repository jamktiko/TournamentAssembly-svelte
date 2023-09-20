var express = require("express");
var router = express.Router();
const { userController } = require("../db/controller");

router.get("/", userController.getAll);

<<<<<<< HEAD
router.post("/", userController.createData);
=======
router.post('/', userController.createData);

router.delete('/:id', userController.deleteById);
>>>>>>> af99d99155d86fa2896b8857496f9dc087f7644a

module.exports = router;
