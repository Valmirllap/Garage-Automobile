const { createCarPics, getCarPics, deleteCarPics } = require("../controllers/carPicsController");

function carPicsRoute(app) {
// ============ ROUTE: CREATE PICS ============
app.post("/carpics/insert", createCarPics);

// ============ ROUTE: READ PICS ============
app.get("/carpics/get/:car_pics_name", getCarPics);

// ============ ROUTE: DELETE PICS ============
app.delete("/carpics/delete/:car_pics_name", deleteCarPics)

}

module.exports = carPicsRoute;