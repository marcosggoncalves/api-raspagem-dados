const router = require('express').Router();

const controller = require('../controller/comilController.js');

router.get('/', controller.index);

module.exports = router;