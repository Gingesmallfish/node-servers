const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 确保上传目录存在
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// 文件过滤器
const fileFilter = (req, file, cb) => {
  // 允许的文件类型
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('只允许上传 JPG、PNG 或 GIF 格式的图片！'), false);
  }
};

// 设置存储引擎
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // 上传文件的目录
  },
  filename: function (req, file, cb) {
    // 生成文件名：时间戳 + 随机数 + 原始扩展名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// 创建multer实例
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 限制文件大小为5MB
  }
});

module.exports = upload;