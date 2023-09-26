const mysql = require("mysql");

// ==================== CONNECTION MYSQL: SCHEDULE ====================
const dbOpeningTime = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'Schedule',
});

// ==================== GET SCHEDULE ====================
function scheduleGet(req, res) {
  const sqlSelectFooter = "SELECT * FROM `scheduleFooter`";
  dbOpeningTime.query(sqlSelectFooter, (err, result) => {
    res.send(result)
  });
}

// ==================== UPDATE SCHEDULE ====================
function scheduleUpdate(req, res) {
  const openingTime = req.body.openingTime;
  const id = req.body.id;
  const sqlUpdateOpenning = "UPDATE `scheduleFooter` SET openingTime = ? WHERE id = ?";
  dbOpeningTime.query(sqlUpdateOpenning, [openingTime, id], (err, result) => {
    if (err) console.log(err)
  })
}


module.exports = { scheduleGet, scheduleUpdate };