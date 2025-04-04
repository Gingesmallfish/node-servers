const {getUserInfo} = require('../services/inFormaTionServives');

/**
 * 获取用户数据
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function getUserInfoController(req, res) {
    const userId = req.params.id;
    try {
        const userInfo = await getUserInfo(userId);
        if (!userInfo) {
            return res.status(404).json({error: 'User not found'});
        }
        res.json(userInfo);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports = {
    getUserInfoController,
};
