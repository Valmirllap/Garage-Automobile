const mysql = require("mysql");

// ==================== CONNECTION MYSQL: CarImg ====================
const dbCarImg = mysql.createConnection({
  user: process.env.MYSQL_HOST || "root",
  host: process.env.MYSQL_USER || "localhost",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "CarImg",
});

dbCarImg.connect();

// ==================== CREATE PICS ====================
function createCarPics(req, res) {
  const car_pics_name = req.body.car_pics_name;
  const url_img = req.body.url_img;
  const sqlInsert = "INSERT INTO `cars_pics` (car_pics_name, url_img) VALUES (?,?);"

  dbCarImg.query(sqlInsert, [car_pics_name, url_img], (err, result) => {
    if (err) {
      res.send({ message: "Erreur, Veuillez réessayer" });
    } else {
      res.send({ message: "Vous venez d'ajouter d'une photo dans la galerie" })
    }
  })
}

// ==================== READ PICS ====================
function getCarPics(req, res) {
  const carPicsName = req.params.car_pics_name;
  const sqlSelect = "SELECT * FROM `cars_pics` WHERE car_pics_name = ?";

  dbCarImg.query(sqlSelect, [carPicsName], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur les données non pas su être récupéré")
    } else {
      const MainCarPics = {
        car_pics_name: carPicsName,
        pictures: result,
      }
      res.send(MainCarPics)
    }
  });
}

// ==================== DELETE PICS ====================
function deleteCarPics(req, res) {
  const car_pics_name = req.params.car_pics_name;
  const sqlDelete = "DELETE FROM `cars_pics` WHERE car_pics_name = ?"

  dbCarImg.query(sqlDelete, car_pics_name, (err, result) => {
    if (err) {
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "Galerie supprimer" });
    }
  })
}

module.exports = { createCarPics, getCarPics, deleteCarPics }