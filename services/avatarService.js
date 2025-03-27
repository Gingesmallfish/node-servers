const db = require('../db/pool');
const fs = require('fs');
const path = require('path');

// 删除旧头像文件
const deleteOldAvatar = async (userId) => {
    try {
        const [rows] = await db.query('SELECT avatar FROM users WHERE id = ?', [userId]);
        //
        if (rows.length > 0 && rows[0].avatar && rows[0].avatar !== '/uploads/default-avatar.jpg') {
            const oldAvatarPath = path.join(__dirname, '..', rows[0].avatar);
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }
        }
    } catch (error) {
        console.error('删除旧头像失败:', error);
    }
};

// 保存头像的服务
const saveAvatar = async (userId, file) => {
    try {
        // 检查用户是否存在
        const [existingUser] = await db.query('SELECT id FROM users WHERE id = ?', [userId]);
        const avatarUrl = `/uploads/${file.filename}`;

        if (existingUser.length === 0) {
            // 用户不存在，插入新记录
            const [insertResult] = await db.query('INSERT INTO users (id, avatar) VALUES (?, ?)', [userId, avatarUrl]);
            if (insertResult.affectedRows === 0) {
                throw new Error('创建用户头像记录失败');
            }
        } else {
            // 用户存在，删除旧头像并更新记录
            await deleteOldAvatar(userId);
            const [updateResult] = await db.query('UPDATE users SET avatar = ? WHERE id = ?', [avatarUrl, userId]);
            if (updateResult.affectedRows === 0) {
                throw new Error('更新用户头像失败');
            }
        }

        return avatarUrl;
    } catch (error) {
        // 如果更新失败，删除新上传的文件
        const newAvatarPath = path.join(__dirname, '..', `/uploads/${file.filename}`);
        if (fs.existsSync(newAvatarPath)) {
            fs.unlinkSync(newAvatarPath);
        }
        throw error;
    }
};

// 获取头像的服务
const getAvatar = async (userId) => {
    try {
        const [rows] = await db.query('SELECT avatar FROM users WHERE id = ?', [userId]);
        if (rows.length === 0) {
            throw new Error('用户未找到');
        }
        // 如果用户没有设置头像，返回默认头像
        return rows[0].avatar || '/uploads/default-avatar.jpg';
    } catch (error) {
        throw error;
    }
};

module.exports = { saveAvatar, getAvatar };
