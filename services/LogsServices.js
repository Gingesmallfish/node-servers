const pool = require('../db/pool');

async function getLoginCounts() {
    const query = `    SELECT timestamp AS second, 
                                COUNT (*) OVER (ORDER BY timestamp) AS count
                                FROM logs
                                WHERE action = 'login'
                                ORDER BY second;
    `;

    const [rows] = await pool.query(query);

    // 将查询结果转换为包含 seconds 和 counts 数组的对象
    const seconds = rows.map(row => row.second.toISOString()); // 保留秒级时间戳
    const counts = rows.map(row => row.count);

    return {seconds, counts};
}

async function logUserLogin(username) {
    const query = `
        INSERT INTO logs (username, action, timestamp)
        VALUES (?, 'login', NOW());
    `;

    await pool.query(query, [username]);
}

module.exports = {
    getLoginCounts,
    logUserLogin
};
