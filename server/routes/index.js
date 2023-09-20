var express = require('express');
var router = express.Router();
const { userController } = require('../db/controller');

router.get('/', userController.getAll);

router.post('/', (req, res) => {
  res.send('test');
});

module.exports = router;
