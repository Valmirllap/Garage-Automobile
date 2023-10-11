const { equipmentGet } = require("../controllers/equipmentCarController");

function equipmentCarRoute(app) {
// ============ ROUTE: READ EQUIPMENTS ============
  app.get("/get/equipment/:car_model_id", equipmentGet);
}

module.exports = equipmentCarRoute;