const { carDataInfoGet, carDataInfoPost, carDataInfoUpdate, carDataInfoDelete } = require("../controllers/carDataInfoController");

function carDataInfoRoute(app) {

  // ============ ROUTE: CREATE COMMENTS ============
  app.post("/post/carinfo", carDataInfoPost);

  // ============ ROUTE: READ COMMENTS ============
  app.get("/get/carinfo", carDataInfoGet);

  // ============ ROUTE: DELETE COMMENTS ============
  app.put("/update/carinfo/:id", carDataInfoUpdate);

  // ============ ROUTE: DELETE COMMENTS ============
  app.delete("/delete/carinfo/:id", carDataInfoDelete);
}

module.exports = carDataInfoRoute;