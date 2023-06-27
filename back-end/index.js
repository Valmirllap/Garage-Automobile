const express = require("express");
const mysql = require("mysql");
const cors = require('cors');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require('bcrypt');
const saltRound = 10;

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
})
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  key: "workerId",
  secret: "verystrongpassword",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 24,
    secure: false,
    httpOnly: true,
  },
}))

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "dbLogin",
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    const isAdmin = req.session.user.isAdmin;
    res.send({ loggedIn: true, isAdmin });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM `logged` WHERE email = ?;",
    email,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result[0];
            const isAdmin = result[0].isAdmin;
            const isEmployee = result[0].isEmployee;
            res.send({ ...result[0], isAdmin, isEmployee });
          } else {
            res.send({ message: "Email ou Mot de passe invalide" });
          }
        });
      } else {
        res.send({ message: "Email introuvable" });
      }
    }
  );
});

app.post("/register", (req, res) => {
  if (req.session.user && req.session.user.isAdmin) {
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRound, (err, hash) => {
      if (err) {
        console.log(err);
        res.send({ message: "Error" });
      } else {
        db.query(
          "INSERT INTO `logged` (email, password) VALUES (?,?)",
          [email, hash],
          (err, result) => {
            if (err) {
              console.log(err);
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
});

app.listen(3002, () => {
  console.log("running server")
});