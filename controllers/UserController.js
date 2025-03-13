const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getCaptcha } = require('../utils/captcha');
const { checkUsernameExistence, insertUser, findUserByUsername } = require('../models/dbQeuries');

// 密钥
const JWT_SECRET = 'token-component';

/**
 *  获取验证码
 * @param req
 * @param res
 */
exports.getCaptcha = (req, res) => {
    try {
        const captcha = getCaptcha();
        req.session.captcha = captcha.text.toLowerCase(); // 存储为小写
        req.session.captchaTime = Date.now();
        res.type('svg');
        res.status(200).send(captcha.data);
    } catch (error) {
        console.error('生成验证码出错:', error);
        res.status(500).json({ message: '服务器内部错误，请稍后重试' });
    }
};

/**
 *  验证验证码
 * @param req
 * @param captcha
 * @returns {{valid: boolean}|{valid: boolean, message: string}}
 */
function validateCaptcha(req, captcha) {
    if (!req.session.captcha || !req.session.captchaTime) {
        console.log('验证码或验证码时间缺失');
        return { valid: false, message: '验证码已过期或无效' };
    }
    const captchaTime = req.session.captchaTime;
    const currentTime = Date.now();
    const tenMinutes = 10 * 60 * 1000;
    if (currentTime - captchaTime > tenMinutes) {
        console.log('验证码已过期');
        return { valid: false, message: '验证码已过期' };
    }
    // 将验证码都进行转换小写进行比较
    if (req.session.captcha.toLowerCase() !== captcha.toLowerCase()) {
        console.log('验证码不匹配');
        return { valid: false, message: '验证码不匹配' };
    }
    return { valid: true };
}

/**
 *  注册验证码
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.register = async (req, res) => {
    const { username, password, confirmPassword, role, captcha, name, sex, phone } = req.body;
    // 检查必填字段
    const requiredFields = ['username', 'password', 'confirmPassword', 'role', 'captcha', 'name', 'sex', 'phone'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
        return res.status(400).json({ message: `缺少必填字段: ${missingFields.join(', ')}` });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: '密码和确认密码不一致' });
    }

    // 验证验证码
    const captchaValidation = validateCaptcha(req, captcha);
    if (!captchaValidation.valid) {
        return res.status(400).json({ message: captchaValidation.message });
    }

    // 验证用户角色
    const validRoles = [1, 2, 3];
    const parsedRole = parseInt(role, 10);
    if (!validRoles.includes(parsedRole)) {
        console.log('无效的用户角色');
        return res.status(400).json({ message: '用户角色无效，必须是 1（学生）、2（教师）或 3（管理员）' });
    }

    // 验证手机号码格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: '请输入有效的手机号码' });
    }

    try {
        // 检查用户名是否已存在
        const results = await checkUsernameExistence(username);
        if (results.length > 0) {
            return res.status(400).json({ message: '用户名已存在' });
        }

        // 加密密码并保存用户
        const hashedPassword = await bcrypt.hash(password, 10);
        await insertUser(username, hashedPassword, parsedRole, name, sex, phone); // 确保字段顺序一致
        res.json({ message: '注册成功' });
    } catch (error) {
        console.error('注册出错:', error);
        res.status(500).json({ message: '服务器内部错误，请稍后重试' });
    }
};

/**
 *  登录验证
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.login = async (req, res) => {
    const { username, password, captcha } = req.body;

    // 检查必填字段
    const requiredFields = ['username', 'password', 'captcha'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
        return res.status(400).json({ message: `缺少必填字段: ${missingFields.join(', ')}` });
    }

    // 验证验证码
    const captchaValidation = validateCaptcha(req, captcha);
    if (!captchaValidation.valid) {
        return res.status(400).json({ message: captchaValidation.message });
    }

    try {
        // 检查用户名是否存在
        const results = await findUserByUsername(username);
        if (results.length === 0) {
            return res.status(401).json({ message: '用户名或密码错误' });
        }

        const user = results[0];

        // 验证密码
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: '用户名或密码错误' });
        }

        // 生成 JWT 令牌
        const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ message: '登录成功', token, user }); // 确保返回用户信息
    } catch (error) {
        console.error('登录出错:', error);
        res.status(500).json({ message: '服务器内部错误，请稍后重试' });
    }
};

/**
 * 退出登录
 * @param req
 * @param res
 */
exports.logout = (req, res) => {
    // 清除 cookie 和 session
    res.clearCookie('token');
    req.session.destroy((err) => {
        if (err) {
            console.error('退出登录错误:', err);
            return res.status(500).json({ message: '服务器内部错误，请稍后重试' });
        }
        console.log('退出登录成功');
        res.json({ message: '退出登录成功' });
    });
};