const { loginGet, loginPost, registerPost } = require("../controllers/userController");
const { verifyJWT } = require("../utils/verifyJWT");

function userRoute (app) {
  // ============ ROUTE: GET LOGIN ============
  app.get("/login", loginGet);

  // ============ ROUTE: POST LOGIN ============
  app.post("/login", loginPost);

  // ============ ROUTE: POST REGISTER ============
  app.post("/register", registerPost);

  // ============ ROUTE: POST AUTH ============
  app.get('/isAuth', verifyJWT, (req, res) => {
    res.send("Authentification réussi! Vous allez être redirigé.")
  });
  
}

module.exports = userRoute;