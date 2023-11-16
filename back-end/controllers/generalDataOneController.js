const mysql = require("mysql2");

// ==================== CONNECTION MYSQL: GENERAL DATA ONE ====================
const dbgeneralDataOne = mysql.createConnection({
  user: process.env.MYSQL_USER || "root",
  host: process.env.MYSQL_HOST || "localhost",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "carData",
});

dbgeneralDataOne.connect();

// ==================== CREATE GENERAL DATA ONE ====================
function generalDataOneCreate(req, res) {
  const { 
    car_id, 
    state, 
    registration, 
    miles, 
    fuel, 
    gearbox, 
    horsePower, 
    cylinder, 
    nbCylinder, 
    co2, 
    emission,
    body, 
    color, 
    nbDoor, 
    hitCar, 
    techCheck, 
    carPass
  } = req.body;
  
  const sqlInsert = `INSERT INTO general_data_one (
    car_id, state, registration, miles, fuel, gearbox, horsePower, cylinder, 
    nbCylinder, co2, emission, body, color, nbDoor, hitCar, techCheck, carPass) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
  `
  const values = [
    car_id,state, registration, miles, fuel, gearbox, horsePower, cylinder, nbCylinder, 
    co2, emission, body, color, nbDoor, hitCar, techCheck, carPass
  ]

  dbgeneralDataOne.query(sqlInsert, values, (err, result) => {
    if (err) {
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "Nouvelle donnée ajoutée" });
    }
  })
}


// ==================== READ GENERAL DATA ONE ====================
function generalDataOneGet(req, res) {
  const carId = req.params.car_id;
  const sqlSelect = "SELECT * FROM `general_data_one` WHERE car_id = ?";

  dbgeneralDataOne.query(sqlSelect, [carId], (err, result) => {
    if (err) {
      res.status(500).send("Erreur les données non pas su être récupéré")
    } else {
      const genrelDataOneMain = {
        car_id: carId,
        generalDataOne: result,
      }
      res.send(genrelDataOneMain)
    }
  });
}

// ==================== UPDATE DATA ONE ====================
function generalDataOneUpdate(req, res) {
  const { id } = req.params;
  const { 
    state, registration, miles, fuel, gearbox, horsePower, cylinder, nbCylinder,
    co2, emission, body, color, nbDoor, hitCar, techCheck, carPass } = req.body;

  const sqlUpdate = "UPDATE `general_data_one` SET ? WHERE id = ?";

  const updateFields = {};
  if (state) updateFields.state = state;
  if (registration) updateFields.registration = registration;
  if (miles) updateFields.miles = miles;
  if (fuel) updateFields.fuel = fuel;
  if (gearbox) updateFields.gearbox = gearbox;
  if (horsePower) updateFields.horsePower = horsePower;
  if (cylinder) updateFields.cylinder = cylinder;
  if (nbCylinder) updateFields.nbCylinder = nbCylinder;
  if (co2) updateFields.co2 = co2;
  if (emission) updateFields.emission = emission;
  if (body) updateFields.body = body;
  if (color) updateFields.color = color;
  if (nbDoor) updateFields.nbDoor = nbDoor;
  if (hitCar) updateFields.hitCar = hitCar;
  if (techCheck) updateFields.techCheck = techCheck;
  if (carPass) updateFields.carPass = carPass;

  dbgeneralDataOne.query(sqlUpdate, [updateFields, id], (err, result) => {
    if (err) {
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "Mise à jour données général one de la voiture" });
    }
  })
}

// ==================== DELETE DATA ONE ====================
function generalDataOneDelete(req, res) {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM `general_data_one` WHERE id = ?"

  dbgeneralDataOne.query(sqlDelete, id, (err, result) => {
    if (err) {
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "Données général supprimer" });
    }
  })
}

module.exports = { generalDataOneCreate, generalDataOneGet, generalDataOneUpdate, generalDataOneDelete }