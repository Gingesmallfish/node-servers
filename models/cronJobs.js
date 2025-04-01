const cron = require('node-cron')
const pool = require('../db/pool')

// 每天0点执行一次
cron.schedule('0 0 * * *', async () => {
    try{
        const query = `      DELETE FROM logs
      WHERE DATE(timestamp) < CURDATE();
    `;

        await pool.query(query);
    } catch (e) {
        console.error('清零登录记录失败', e)
    }
})

console.log('定时任务已设置，每天凌晨 0 点清零登录记录');