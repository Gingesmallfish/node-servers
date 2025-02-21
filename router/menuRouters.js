const express = require('express');
const menuController = require('../controller/menuController');

const router = express.Router();

// 获取根菜单
router.get('/menus', menuController.getRootMenus);

// 获取指定菜单的子菜单
router.get('/menus/:id/children/ids', menuController.getSubMenus);

module.exports = router;
