const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerMiddleware');
const avatarController = require('../controllers/AvatarController');
const authMiddleware = require('../middleware/authMiddleware');

// 上传头像的路由
router.post('/upload', authMiddleware, upload.single('avatar'), avatarController.saveAvatarController);

// 获取头像的路由
router.get('/:userId/avatar', avatarController.getAvatarController);

module.exports = router;
