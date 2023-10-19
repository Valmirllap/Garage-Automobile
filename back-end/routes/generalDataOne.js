const { generalDataOneCreate ,generalDataOneGet, generalDataOneUpdate, generalDataOneDelete } = require("../controllers/generalDataOneController");

function DataOneCarRoute(app) {
// ============ ROUTE: CREATE GENERAL DATA ONE ========================
app.post("/dataone/create/:car_id", generalDataOneCreate);
// ============ ROUTE: READ GENERAL DATA ONE ========================
app.get("/dataone/get/:car_id", generalDataOneGet);
// ============ ROUTE: UPDATE GENERAL DATA ONE ========================
app.put("/dataone/update/:id", generalDataOneUpdate);
// ============ ROUTE: DELETE GENERAL DATA ONE ========================
app.delete("/dataone/delete/:id", generalDataOneDelete);
}

module.exports = DataOneCarRoute;