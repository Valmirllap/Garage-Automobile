const mysql = require("mysql");

// ==================== CONNECTION MYSQL: EquipmentCar ====================
const dbEquipments_data = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'equipments_data',
});

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

module.exports = { equipmentGet };