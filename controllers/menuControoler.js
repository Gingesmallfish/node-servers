const { getMenus } = require('../models/menu');
const { buildTree } = require('../utils/treeBuilder');

// 获取菜单树
exports.getMenuTree = async (req, res) => {
    try {
        const allMenus = await getMenus();
        const menuTree = buildTree(allMenus);
        res.json({ success: true, data: menuTree });
    } catch (error) {
        console.error('获取菜单树失败:', error);
        res.status(500).json({ success: false, message: '获取菜单树失败' });
    }
};