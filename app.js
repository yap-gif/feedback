require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// **📌 允许跨域请求**
app.use(cors());
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({
  origin: '*', // 生产环境应限制为具体域名
  methods: ['GET', 'POST']
}));

// **📌 连接 MySQL**
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'feedback_system'
});

db.connect((err) => {
    if (err) {
        console.error("❌ 数据库连接失败:", err.message);
        return;
    }
    console.log("✅ 连接到 MySQL 数据库.");
});

// **📌 API：提交用户反馈**
app.post("/feedback", (req, res) => {
    const { name, email, feedback } = req.body;

    if (!name || !email || !feedback) {
        return res.status(400).json({ error: "所有字段均为必填项!" });
    }

    const query = "INSERT INTO feedback (name, email, feedback) VALUES (?, ?, ?)";
    db.query(query, [name, email, feedback], (err) => {
        if (err) {
            console.error("❌ 反馈插入失败:", err.message);
            return res.status(500).json({ error: "数据库错误" });
        }
        res.status(200).json({ message: "反馈提交成功!" });
    });
});

// **📌 API：获取所有反馈**
app.get("/feedback", (req, res) => {
    db.query("SELECT * FROM feedback", (err, results) => {
        if (err) {
            console.error("❌ 获取反馈失败:", err.message);
            return res.status(500).json({ error: "数据库错误" });
        }
        res.json(results);
    });
});

// **📌 启动服务器**
app.listen(PORT, () => {
    console.log(`🚀 服务器运行在: http://localhost:${PORT}`);
});
