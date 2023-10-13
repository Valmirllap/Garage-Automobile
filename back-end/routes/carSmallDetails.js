const { smallDetailsGet, smallDetailsCreate, smallDetailsUpdate, smallDetailsDelete } = require("../controllers/carSmallDetailsController");

function smallDetailsCarRoute(app) {
// ============ ROUTE: CREATE SMALL DETAILS ============
  app.post("/smalldetails/create/:car_id", smallDetailsCreate);

// ============ ROUTE: READ SMALL DETAILS ============
  app.get("/smalldetails/get/:car_id", smallDetailsGet);

// ============ ROUTE: UPDATE SMALL DETAIL ============
  app.put("/smalldetails/update/:id", smallDetailsUpdate);

// ============ ROUTE: DELETE SMALL DETAILS ============
  app.delete("/smalldetails/delete/:id", smallDetailsDelete);
}

module.exports = smallDetailsCarRoute