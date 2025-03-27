const express = require('express');
const { getUserInfoController } = require('../controllers/inFormaTionControllers');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
// 获取用户信息
router.get('/user/:id', authMiddleware, getUserInfoController);

module.exports = router;