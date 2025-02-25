const express = require('express')
const router = express.Router()
const { getCaptcha, register, login, logout} = require('../controllers/UserController'); // 引入 UserController
// 获取验证码接口
router.get('/captcha', getCaptcha);

// 注册接口
router.post('/registerAPI', register);

// 登录接口
router.post('/login', login);

// 退出
router.get('/logout', logout);

module.exports = router
