const express = require('express');
const router = express.Router();
const UserRouter = require('../router/userRouters');
const avatarRoutes = require('../router/avatarRoutes');
const menuController = require('../controllers/menuControoler');
const inFormationRouter = require('../router/informationRoutes');


// 挂载用户路由
router.use('/user', UserRouter);
// 挂载头像路由
router.use('/', avatarRoutes);
// 定义菜单路
router.use('/menus', menuController.getMenuTree);

// 定义个人信息路由
router.use('/personal', inFormationRouter);

// 挂载头像路由
router.use('/avatar', avatarRoutes);


module.exports = router;