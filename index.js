const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const interfaces = require('./interface/interface'); // 引入接口文件
const menusRouters = require('./router/menuRouters');  // 引入菜单数据
// 引入数据库
require('./db/connection')

const app = express();
app.use(cors(
    {
        origin: 'http://localhost:8080',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        // 十分钟
        maxAge: 1000 * 60 * 10,
    }
}));

// 设置静态文件服务，以便可以访问上传的头像
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// 静态文件
app.use(express.static(path.join(__dirname, 'public')));
// 挂载路由
app.use('/api', interfaces);

app.use('/menu', menusRouters)


// 启动服务器
const port = 3000
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
