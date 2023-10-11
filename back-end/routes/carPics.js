const { createCarPics, getCarPics } = require("../controllers/carPicsController");

function carPicsRoute(app) {
// ============ ROUTE: CREATE COMMENTS ============
app.post("/carpics/insert", createCarPics);

// ============ ROUTE: READ COMMENTS ============
app.get("/carpics/get/:car_pics_name", getCarPics);

// ============ ROUTE: UPDATE COMMENTS ============


// ============ ROUTE: DELETE COMMENTS ============


}

module.exports = carPicsRoute;