const menuService = require('../services/menuService');

// 获取根菜单
async function getRootMenus(req, res) {
    try {
        const menus = await menuService.getRootMenus();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: '获取根菜单失败', error: error.message });
    }
}

// 获取指定菜单的子菜单
async function getSubMenus(req, res) {
    const menuId = req.params.id;
    try {
        const menus = await menuService.getSubMenus(menuId);
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: '获取子菜单失败', error: error.message });
    }
}

module.exports = {
    getRootMenus,
    getSubMenus,
};
