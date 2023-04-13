const express = require('express');
const router = express.Router();
const controller = require('../controller/read.controller');

router.get('/getTransaction',controller.main_function);

module.exports = router;