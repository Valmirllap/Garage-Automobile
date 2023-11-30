const mysql = require('mysql2');

// ==================== CONNECTION MYSQL: Services ====================
const dbServices = mysql.createConnection({
  user: process.env.MYSQL_USER || "root",
  host: process.env.MYSQL_HOST || "localhost",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "CrudComments",
});


module.exports = dbServices;