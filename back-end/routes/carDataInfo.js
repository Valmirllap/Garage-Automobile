const { carDataInfoGet, carDataInfoPost, carDataInfoUpdate, carDataInfoDelete } = require("../controllers/carDataInfoController");

function carDataInfoRoute(app) {

  // ============ ROUTE: CREATE CAR INFO ============
  app.post("/post/carinfo", carDataInfoPost);

  // ============ ROUTE: READ CAR INFO ============
  app.get("/get/carinfo", carDataInfoGet);

  // ============ ROUTE: UPDATE CAR INFO ============
  app.put("/update/carinfo/:id", carDataInfoUpdate);

  // ============ ROUTE: DELETE CAR INFO ============
  app.delete("/delete/carinfo/:id", carDataInfoDelete);
}

module.exports = carDataInfoRoute;