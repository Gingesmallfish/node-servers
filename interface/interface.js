const express = require('express');
const UserRouter = require('../router/userRouters');
const avatarRoutes = require('../router/avatarRoutes');


const router = express.Router();

// 挂载用户路由
router.use('/user', UserRouter);
// 挂载头像路由
router.use('/', avatarRoutes);



const { getMenus } = require('../models/menu');
const { buildTree } = require('../utils/treeBuilder');
const { sortMenus } = require('../utils/menuSorter');

// 定义路由
router.get('/menus/menu-tree', async (req, res) => {
    try {
        // 从数据库获取所有菜单数据
        const allMenus = await getMenus();
        // 将扁平化数据转换为树形结构
        const menuTree = buildTree(allMenus);
        // 对菜单进行排序
        const sortedMenuTree = sortMenus(menuTree);
        res.json({ success: true, data: sortedMenuTree });
    } catch (error) {
        console.error('获取菜单树失败:', error);
        res.status(500).json({ success: false, message: '获取菜单树失败' });
    }
});


module.exports = router;
