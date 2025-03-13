const express = require('express');
const UserRouter = require('../router/userRouters');
const avatarRoutes = require('../router/avatarRoutes');
const router = express.Router();

// 挂载用户路由
router.use('/user', UserRouter);
// 挂载头像路由
router.use('/', avatarRoutes);

// 导入 menuController
const menuController = require('../controllers/menuControoler');

// 定义菜单路由
router.use('/menus', menuController.getMenuTree);

module.exports = router;