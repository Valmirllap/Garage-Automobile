const { equipmentGet } = require("../controllers/equipmentCarController");

function equipmentCarRoute(app) {
  app.get("/get/equipment/:car_model_id", equipmentGet)
}

module.exports = equipmentCarRoute;