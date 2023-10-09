const mysql = require("mysql");

// ==================== CONNECTION MYSQL: carData ====================
const dbCarData = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'carData',
});

// ==================== CREATE CAR DATA ====================
function carDataInfoPost(req, res) {
  const image = req.body.image;
  const car = req.body.car;
  const title = req.body.title;
  const year = req.body.year;
  const gas = req.body.gas;
  const miles = req.body.miles;
  const price = req.body.price;
  const link = req.body.link;
  const picsLink = req.body.picsLink;
  const sqlInsert = "INSERT INTO `info_cars` (image ,car, title, year, gas, miles, price, link, picsLink) VALUES (?,?,?,?,?,?,?,?,?);"

  dbCarData.query(sqlInsert, [image, car, title, year, gas, miles, price, link, picsLink], (err, result) => {
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
function carDataInfoUpdate (req, res) {
  const { id } = req.params;
  const { image, car, title, year, gas, miles, price, link, picsLink} = req.body;

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


  dbCarData.query(sqlUpdate, [updateFields, id], (err, result) => {
    if (err) {
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "Mise à jour de la voiture" });
    }
  })
}

// ==================== DELETE CAR DATA ====================

function carDataInfoDelete (req, res) {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM `info_cars` WHERE id = ?"

  dbCarData.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err)
  })
}

module.exports = { carDataInfoGet, carDataInfoPost, carDataInfoUpdate, carDataInfoDelete }