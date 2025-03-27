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
            maxAge: 1000 * 60 * 10 // 10分钟
        }
    }
};