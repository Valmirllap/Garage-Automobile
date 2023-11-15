const mysql = require("mysql");

// ==================== CONNECTION MYSQL: carData ====================
const dbCarData = mysql.createConnection({
  user: process.env.MYSQL_HOST || "root",
  host: process.env.MYSQL_USER || "localhost",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "carData",
});

dbCarData.connect();

// ==================== CREATE CAR DATA ====================
function carDataInfoPost(req, res) {
  const { image, car, title, year, gas, miles, price, link, picsLink, dashboardLink } = req.body;
  const sqlInsert = "INSERT INTO `info_cars` (image, car, title, year, gas, miles, price, link, picsLink, dashboardLink) VALUES (?,?,?,?,?,?,?,?,?,?);"

  dbCarData.query(sqlInsert, [image, car, title, year, gas, miles, price, link, picsLink, dashboardLink], (err, result) => {
    if (err) {
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "Nouvelle Voiture ajoutée" });
    }
  })
}


// ==================== READ CAR DATA ====================
function carDataInfoGet(req, res) {
  const sqlSelect = "SELECT * FROM `info_cars`";

  dbCarData.query(sqlSelect, (err, result) => {
    res.send(result)
  });
}

// ==================== UPDATE CAR DATA ====================
function carDataInfoUpdate(req, res) {
  const { id } = req.params;
  const { image, car, title, year, gas, miles, price, link, picsLink, dashboardLink } = req.body;

  const sqlUpdate = "UPDATE `info_cars` SET ? WHERE id = ?";

  const updateFields = {};
  if (image) updateFields.image = image;
  if (car) updateFields.car = car;
  if (title) updateFields.title = title;
  if (year) updateFields.year = year;
  if (gas) updateFields.gas = gas;
  if (miles) updateFields.miles = miles;
  if (price) updateFields.price = price;
  if (link) updateFields.link = link;
  if (picsLink) updateFields.picsLink = picsLink;
  if(dashboardLink) updateFields.dashboardLink = dashboardLink;


  dbCarData.query(sqlUpdate, [updateFields, id], (err, result) => {
    if (err) {
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "Mise à jour de la voiture" });
    }
  })
}

// ==================== DELETE CAR DATA ====================

function carDataInfoDelete(req, res) {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM `info_cars` WHERE id = ?"

  dbCarData.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err)
  })
}

module.exports = { carDataInfoGet, carDataInfoPost, carDataInfoUpdate, carDataInfoDelete }