const express = require('express');
const router = express.Router();
const UserRouter = require('../router/userRouters');
const avatarRoutes = require('../router/avatarRoutes');
const menuController = require('../controllers/menuControoler');
const inFormationRouter = require('../router/informationRoutes');
const LogsRoutes = require('../router/logsRoutes');

// 挂载用户路由
router.use('/user', UserRouter);
// 挂载头像路由
router.use('/', avatarRoutes);
// 定义菜单路
router.use('/Menus', menuController.getMenuTree);

// 定义个人信息路由
router.use('/personal', inFormationRouter);

// 挂载头像路由
router.use('/avatar', avatarRoutes);

// 挂载日志路由
router.use('/logs', LogsRoutes);


module.exports = router;