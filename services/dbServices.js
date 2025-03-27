const pool = require('../db/pool'); // 引入数据库连接池
/**
 *  查询用户名是否存在
 * @param username 用户名
 * @returns {Promise<*>} 异步返回查询结果
 */
async function checkUsernameExistence(username) {
    try {
        const [results] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
        return results;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('服务器内部错误');
    }
}

/**
 * 插入用户
 * @param username 用户名
 * @param hashedPassword 密码
 * @param role 角色 1学生 2教师,3 管理员
 * @param name 姓名
 * @param sex 性别
 * @param phone 手机号
 * @param introduction 个人简介
 * @returns {Promise<*>} 异步返回查询结果
 */
async function insertUser(username, hashedPassword, role, name, sex, phone) {
    try {
        const [results] = await pool.execute(
            'INSERT INTO users (username, password, role, name, sex, phone) VALUES (?, ?, ?, ?, ?, ?)',
            [username, hashedPassword, role, name, sex, phone] // 确保字段顺序和值顺序一致
        );
        return results;
    } catch (error) {
        console.error('数据插入失败', error);
        throw new Error('服务器内部错误');
    }
}

/**
 * 根据用户名查找用户
 * @param username 用户名
 * @returns {Promise<*>} 异步返回查询结果
 */
async function findUserByUsername(username) {
    try {
        const [results] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
        return results;
    } catch (error) {
        console.error('用户查找失败:', error);
        throw new Error('服务器内部错误');
    }
}


module.exports = {
    checkUsernameExistence,
    insertUser,
    findUserByUsername
};
