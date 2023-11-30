const dbCarSmallDetails = require('../mysql/carData');

// ==================== CREATE SMALL DETAILS ====================
function smallDetailsCreate(req, res) {
  const { car_id, state, firstReg, gearbox, fuel, miles, image, alt } = req.body;
  const sqlInsert = "INSERT INTO `small_details` (car_id, state, firstReg, gearbox, fuel, miles, image, alt) VALUES (?,?,?,?,?,?,?,?);"

  dbCarSmallDetails.query(sqlInsert, [car_id, state, firstReg, gearbox, fuel, miles, image, alt], (err, result) => {
    if (err) {
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "Nouveaux détails ajoutée" });
    }
  })
}

// ==================== READ SMALL DETAILS ====================
function smallDetailsGet(req, res) {
  const carId = req.params.car_id;
  const sqlSelect = "SELECT * FROM `small_details` WHERE car_id = ?";

  dbCarSmallDetails.query(sqlSelect, [carId], (err, result) => {
    if (err) {
      res.status(500).send("Erreur les données non pas su être récupéré")
    } else {
      const smallDetailMain = {
        car_id: carId,
        smallDetail: result,
      }
      res.send(smallDetailMain)
    }
  });
}

// ==================== UPDATE SMALL DETAILS ====================
function smallDetailsUpdate(req, res) {
  const { id } = req.params;
  const { state, firstReg, gearbox, fuel, miles, image, alt } = req.body;

  const sqlUpdate = "UPDATE `small_details` SET ? WHERE id = ?";

  const updateFields = {};
  if (state) updateFields.state = state;
  if (firstReg) updateFields.firstReg = firstReg;
  if (gearbox) updateFields.gearbox = gearbox;
  if (fuel) updateFields.fuel = fuel;
  if (miles) updateFields.miles = miles;
  if (image) updateFields.image = image;
  if (alt) updateFields.alt = alt;

  dbCarSmallDetails.query(sqlUpdate, [updateFields, id], (err, result) => {
    if (err) {
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "Mise à jour du details de la voiture" });
    }
  })
}

// ==================== DELETE SMALL DETAILS ====================
function smallDetailsDelete(req, res) {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM `small_details` WHERE id = ?"

  dbCarSmallDetails.query(sqlDelete, id, (err, result) => {
    if (err) {
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "Détail supprimer" });
    }
  })
}


module.exports = { smallDetailsGet, smallDetailsCreate, smallDetailsUpdate, smallDetailsDelete }