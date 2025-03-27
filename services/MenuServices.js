const pool = require('../db/pool');

// 获取所有菜单数据，并按 sort_order 排序
const getMenus = async () => {
    try {
        const [rows] = await pool.execute('SELECT * FROM menus');
        return rows;
    } catch (error) {
        console.error('查询菜单数据失败:', error);
        throw error;
    }
};

module.exports = {
    getMenus
};



