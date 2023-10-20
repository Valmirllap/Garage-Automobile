const { equipmentCreate, equipmentGet, equipmentUpdate, equipmentDelete, allEquipmentDelete } = require("../controllers/equipmentCarController");

function equipmentCarRoute(app) {
  // ============ ROUTE: READ EQUIPMENTS ============
  app.post("/create/equipment", equipmentCreate);

  // ============ ROUTE: READ EQUIPMENTS ============
  app.get("/get/equipment/:car_model_id", equipmentGet);

  // ============ ROUTE: UPDATE EQUIPMENTS ============
  app.put("/update/equipment/:id", equipmentUpdate);

  // ============ ROUTE: DELETE EQUIPMENTS ============
  app.delete("/delete/equipment/:id", equipmentDelete);

  // ============ ROUTE: DELETE ALL EQUIPMENTS ============
  app.delete("/delete/allequipment/:car_model_id", allEquipmentDelete);
}

module.exports = equipmentCarRoute;