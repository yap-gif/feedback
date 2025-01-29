// 引入必要模块
require('dotenv').config({ path: __dirname + '/.env' });

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

require('dotenv').config();
require('dotenv').config();
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

const mysql = require('mysql');

// 创建数据库连接
const connection = mysql.createConnection({
    host: process.env.DB_HOST,      // 数据库主机名
    user: process.env.DB_USER,      // 数据库用户名
    password: process.env.DB_PASSWORD, // 数据库密码
    database: process.env.DB_NAME,  // 数据库名称
    port: process.env.DB_PORT || 3306 // 数据库端口（默认 3306）
});

// 测试连接
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1); // 连接失败，退出程序
    } else {
        console.log('Successfully connected to the MySQL database!');
        connection.end(); // 关闭连接
    }
});
