/**
 *  身份验证中间件
 * @param {Object} req Express请求对象，用于获取请求信息
 * @param {Object} res Express响应对象，用于发送响应
 * @param {Function} next 用于控制中间件执行流程的函数
 * @returns {*} 如果身份验证失败，返回错误响应；否则，调用next函数继续执行下一个中间件
 */
function authMiddleware(req, res, next) {
    // 从session中获取用户信息
    const user = req.session.user;

    // 如果session中没有用户信息，返回未授权错误
    if (!user) {
        return res.status(401).json({error: '未授权'});
    }

    // 将用户信息添加到req对象中
    req.user = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    // 继续执行下一个中间件
    next();
}


module.exports = authMiddleware;