const express = require('express');
const UserRouter = require('../router/userRouters');
const avatarRoutes = require('../router/avatarRoutes');


const router = express.Router();

// 挂载用户路由
router.use('/user', UserRouter);
// 挂载头像路由
router.use('/', avatarRoutes);


module.exports = router;
