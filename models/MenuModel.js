// models/menuModel.js
const db = require('../db/connection');

// 获取根菜单
async function getRootMenus() {
  const [rows] = await db.execute(
      'SELECT * FROM menus WHERE parent_id IS NULL ORDER BY id'
  );
  return rows;
}

// 获取子菜单
async function getSubMenus(parentId) {
  const [rows] = await db.execute(
      'SELECT * FROM menus WHERE parent_id = ? ORDER BY id',
      [parentId]
  );
  return rows;
}

module.exports = {
  getRootMenus,
  getSubMenus,
};
