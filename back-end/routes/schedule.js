const { scheduleGet, scheduleUpdate } = require("../controllers/scheduleController");

function scheduleRoute(app) {
  // ================== ROUTE: GET SCHEDULE ==================
  app.get("/get/opening", scheduleGet);

  // ================== ROUTE: UPDATE SCHEDULE ==================
  app.put("/update/opening", scheduleUpdate);

}

module.exports = scheduleRoute;