module.exports = {
    port: 3000,
    cors: {
        origin: 'http://localhost:8080',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    },
    session: {
        secret: 'secretKey',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,  // 有效期为1天
            httpOnly: true,
            secure: false // 如果使用 HTTPS，设置为 true
        }
    }
};