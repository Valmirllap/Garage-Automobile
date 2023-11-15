const mysql = require("mysql");

// ==================== CONNECTION MYSQL: EquipmentCar ====================
const dbEquipments_data = mysql.createConnection({
  user: process.env.MYSQL_HOST || "root",
  host: process.env.MYSQL_USER || "localhost",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "equipments_data",
});

dbEquipments_data.connect();

// ==================== CREATE EQUIPMENTS ====================
function equipmentCreate(req, res) {
  const { car_model_id, li } = req.body;
  const sqlInsert = "INSERT INTO `equipments` (car_model_id, li) VALUES (?,?);"

  dbEquipments_data.query(sqlInsert, [car_model_id, li], (err, result) => {
    if (err) {
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "Nouvelle Equipement ajoutée" });
    }
  })
}

// ==================== READ EQUIPMENTS ====================
function equipmentGet(req, res) {
  const carModelId = req.params.car_model_id;
  const sqlSelect = "SELECT * FROM `equipments` WHERE car_model_id = ?";

  dbEquipments_data.query(sqlSelect, [carModelId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur les données non pas su être récupéré")
    } else {
      const equipmentMain = {
        car_model_id: carModelId,
        equipment: result,
      }
      res.send(equipmentMain)
    }
  });
}

// ==================== UPDATE EQUIPMENTS ====================
function equipmentUpdate(req, res) {
  const { id } = req.params;
  const { car_model_id, li } = req.body;

  const sqlUpdate = "UPDATE `equipments` SET ? WHERE id = ?";

  const updateFields = {};
  if (car_model_id) updateFields.car_model_id = car_model_id;
  if (li) updateFields.li = li;

  dbEquipments_data.query(sqlUpdate, [updateFields, id], (err, result) => {
    if (err) {
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "Mise à jour de l'equipement" });
    }
  })
}

// ==================== DELETE EQUIPMENTS ====================
function equipmentDelete(req, res) {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM `equipments` WHERE id = ?"

  dbEquipments_data.query(sqlDelete, id, (err, result) => {
    if (err) {
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "equipement supprimer" });
    }
  })
}

// ==================== DELETE ALL EQUIPMENTS ====================
function allEquipmentDelete(req, res) {
  const car_model_id = req.params.car_model_id;
  const sqlDelete = "DELETE FROM `equipments` WHERE car_model_id = ?"

  dbEquipments_data.query(sqlDelete, car_model_id, (err, result) => {
    if (err) {
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "Tout les équipements supprimer" });
    }
  })
}

module.exports = { equipmentCreate, equipmentGet, equipmentUpdate, equipmentDelete, allEquipmentDelete };