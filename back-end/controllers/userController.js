const jwt = require('jsonwebtoken');
const dbConnexion = require('../mysql/dbLogin');
const bcrypt = require('bcryptjs');
const saltRound = 10;

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
            res.json({ auth: false, message: "Email ou Mot de passe invalide" }); // Sachant ici que c'est le mot de passe qui ne matche pas
          }
        });
      } else {
        res.json({ auth: false, message: "Email ou mot de passe invalide" }); // Sachant ici que c'est l'email qui ne matche pas
      }
    }
  );
}
// ==================== POST REGISTER ====================
function registerPost (req, res) {
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
}



module.exports = { loginGet, loginPost, registerPost };