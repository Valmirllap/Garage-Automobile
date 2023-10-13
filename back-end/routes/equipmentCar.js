const { equipmentCreate, equipmentGet, equipmentUpdate, equipmentDelete } = require("../controllers/equipmentCarController");

function equipmentCarRoute(app) {
  // ============ ROUTE: READ EQUIPMENTS ============
  app.post("/create/equipment", equipmentCreate);

  // ============ ROUTE: READ EQUIPMENTS ============
  app.get("/get/equipment/:car_model_id", equipmentGet);

  // ============ ROUTE: UPDATE EQUIPMENTS ============
  app.put("/update/equipment/:id", equipmentUpdate);

  // ============ ROUTE: DELETE EQUIPMENTS ============
  app.delete("/delete/equipment/:id", equipmentDelete);
}

module.exports = equipmentCarRoute;