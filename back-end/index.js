const express = require("express");
const mysql = require("mysql");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "dbLogin",
});

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   db.query(
//     "INSERT INTO `login` (email, password) VALUES (?,?)",
//     [email, password],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Success");
//       }
//     });
// });

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM `logged` WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        res.status(500).send("Error");
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Email ou Mot de passe invalide" })
      }
    });
});

app.listen(3002, () => {
  console.log("running server")
});