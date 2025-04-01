const express = require('express');
const router = express.Router();
const LogsController  = require('../controllers/LogsControllers');

router.get('/login-counts', LogsController.getLoginCounts)

module.exports = router

