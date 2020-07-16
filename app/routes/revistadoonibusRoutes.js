const router = require('express').Router();

const controller = require('../controller/revistadoonibusController.js');

router.get('/', controller.index);

module.exports = router;