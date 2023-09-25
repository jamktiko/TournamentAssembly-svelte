var express = require('express');
var router = express.Router();
const { verifyToken } = require('../db/auth');
const { userController } = require('../db/controller');

router.get('/', userController.getAll);

router.post('/login', verifyToken, userController.loginUser);

router.post('/register', userController.registerUser);

router.post('/', userController.createData);

router.delete('/', verifyToken, userController.deleteById);

module.exports = router;
