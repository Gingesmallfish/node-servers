const pool = require('../db/connection');

// 获取用户信息 用户名，role，年龄，phone
async function getUserInfo(userId) {
    try {
        const query = `SELECT username, role, sex, phone, name, introduction
                       FROM users WHERE user_id = ?`;
        const [rows] = await pool.execute(query, [userId]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    } catch (error) {
        console.error('查询用户信息失败:', error);
        throw error;
    }
}

module.exports = {
    getUserInfo,
};