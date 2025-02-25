const express = require('express');
const router = express.Router();

const { getUserInfoController } = require('../controllers/inFormaTionControllers');
const authMiddleware = require('../middleware/authMiddleware');

// 获取用户信息
router.get('/user/:id', authMiddleware, getUserInfoController);

module.exports = router;