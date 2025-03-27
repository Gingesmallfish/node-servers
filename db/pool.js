const mysql = require('mysql2/promise');

// 创建数据库连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'educational',
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

module.exports = pool;
