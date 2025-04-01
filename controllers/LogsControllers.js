const LogsServices = require('../services/LogsServices');

function getLoginCounts(req, res) {
    LogsServices.getLoginCounts()
        .then(loginCounts => {

            res.json(loginCounts);
        })
        .catch(error => {
            console.error('获取用户登录次数失败:', error);
            res.status(500).json({ message: '服务器内部错误，请稍后重试' });
        });
}

module.exports = {
    getLoginCounts
};
