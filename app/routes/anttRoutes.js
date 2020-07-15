const router = require('express').Router();

const controller = require('../controller/anttController.js');

router.get('/', controller.index);

module.exports = router;