const pool = require('../db/pool');

/**
 * 获取用户信息 用户名，role，年龄，phone
 * @param userId 用户id
 * @returns {Promise<*|null>}
 */
async function getUserInfo(userId) {
    try {
        const query = `SELECT username, role, sex, phone, name, introduction
                       FROM users WHERE id = ?`;
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