const mysql = require("mysql2");

// ==================== CONNECTION MYSQL: dbLogin ====================
const dbConnexion = mysql.createPool({
  user: process.env.MYSQL_USER|| "root",
  host: process.env.MYSQL_HOST || "localhost",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "dbLogin",
});

module.exports = dbConnexion;