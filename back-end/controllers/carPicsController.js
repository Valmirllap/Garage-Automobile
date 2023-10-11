const mysql = require("mysql");

// ==================== CONNECTION MYSQL: CarImg ====================
const dbCarImg = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'CarImg',
});

// ==================== CREATE COMMENTS ====================
function createCarPics(req, res) {
  const car_pics_name = req.body.car_pics_name;
  const url_img = req.body.url_img;
  const sqlInsert = "INSERT INTO `cars_pics` (car_pics_name, url_img) VALUES (?,?);"

  dbCarImg.query(sqlInsert, [car_pics_name, url_img], (err, result) => {
    if (err) {
      res.send({ message: "Erreur, Veuillez réessayer" });
    } else {
      res.send({ message: "Commentaire envoyé!" })
    }
  })
}

// ==================== READ COMMENTS ====================
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

// ==================== UPDATE COMMENTS ====================


// ==================== DELETE COMMENTS ====================


module.exports = { createCarPics, getCarPics }