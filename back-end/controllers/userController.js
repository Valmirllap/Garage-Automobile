const jwt = require('jsonwebtoken');
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const saltRound = 10;


// ==================== CONNECTION MYSQL: dbLogin ====================
const dbConnexion = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "dbLogin",
});
// ==================== GET LOGIN ====================
function loginGet(req, res) {
  if (req.session.user) {
    const isAdmin = req.session.user.isAdmin;
    res.send({ loggedIn: true, isAdmin });
  } else {
    res.send({ loggedIn: false });
  }
}
// ==================== POST LOGIN ====================
function loginPost (req, res) {
  const { email, password } = req.body;
  dbConnexion.query(
    "SELECT * FROM `logged` WHERE email = ?;",
    email,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const id = result[0].id;
            const token = jwt.sign({ id }, "jwtSecret", {
              expiresIn: 300,
            })
            req.session.user = result[0];
            res.json({ auth: true, token: token, result: { ...result[0] } })
          } else {
            res.json({ auth: false, message: "Email ou Mot de passe invalide" });
          }
        });
      } else {
        res.json({ auth: false, message: "Email introuvable" });
      }
    }
  );
}
// ==================== POST REGISTER ====================
function registerPost (req, res) {
  if (req.session.user && req.session.user.isAdmin) {
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRound, (err, hash) => {
      if (err) {
        res.send({ message: "Error" });
      } else {
        dbConnexion.query(
          "INSERT INTO `logged` (email, password) VALUES (?,?)",
          [email, hash],
          (err, result) => {
            if (err) {
              res.send({ message: "Error" });
            } else {
              res.send({ message: "Inscription réussie" });
            }
          }
        );
      }
    });
  } else {
    res.status(403).send({ message: "Accès refusé" });
  }
}



module.exports = { loginGet, loginPost, registerPost };