const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const interfaces = require('./interface/interface'); // 引入接口文件
const config = require('./config/config'); // 引入配置文件

// 引入数据库
require('./db/pool');

const app = express();

// 跨域设置
app.use(cors(config.cors));

// 使用express内置中间件替代bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session配置
app.use(session(config.session));

// 设置静态文件服务，以便可以访问上传的头像
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// 静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 挂载路由
app.use('/api', interfaces);

// 启动服务器
app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`);
});
