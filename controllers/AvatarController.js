const avatarService = require('../services/avatarService');

// 保存头像的控制器
const saveAvatarController = async (req, res) => {
  try {
    console.log('req.user:', req.user); // 检查用户信息
    console.log('req.file:', req.file); // 检查文件信息
    const userId = req.user.id; // 从认证中间件获取用户ID
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
    const avatarUrl = await avatarService.saveAvatar(userId, file);
    res.send({ message: '头像上传成功', avatarUrl });
  } catch (error) {
    res.status(500).send(error);
  }
};

// 获取头像的控制器
const getAvatarController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const avatarUrl = await avatarService.getAvatar(userId);
    res.send({ avatarUrl });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { saveAvatarController, getAvatarController };
