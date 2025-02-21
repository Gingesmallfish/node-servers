const menuModel = require('../models/menuModel');

// 获取根菜单
async function getRootMenus() {
    return await menuModel.getRootMenus();
}

// 获取子菜单
async function getSubMenus(menuId) {
    return await menuModel.getSubMenus(menuId);
}

module.exports = {
    getRootMenus,
    getSubMenus,
};
