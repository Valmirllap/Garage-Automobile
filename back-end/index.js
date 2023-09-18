const express = require("express");
const mysql = require("mysql");
const cors = require('cors');

// ========= AUTHORISATION =========
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require('bcrypt');
const saltRound = 10;

// ========= AUTHENTICATION =========
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
})
);


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// ========= SESSION =========
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


// ========= SERVER-SIDE FOR CONNEXION =========
const dbConnexion = mysql.createConnection({
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


const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]
  if (!token) {
    res.send("No token found!")
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Failed Authenticate" });
      } else {
        req.workerId = decoded.id;
        next();
      }
    });
  }
};
app.get('/isAuth', verifyJWT, (req, res) => {
  res.send("Authentification réussi! Vous allez être redirigé.")
})


app.post('/login', (req, res) => {
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
            res.json({ auth: true, token: token, result: { ...result[0] }})
          } else {
            res.json({ auth: false, message: "Email ou Mot de passe invalide" });
          }
        });
      } else {
        res.json({ auth: false, message: "Email introuvable" });
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
        dbConnexion.query(
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

// ========= SERVER-SIDE FOR COMMENTS =========
const dbComments = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'CrudComments',
});

app.get('/api/get', (req, res) => {
  const sqlSelect = "SELECT * FROM `Reviews`";
  dbComments.query(sqlSelect, (err, result) => {
    res.send(result)
  });
})

app.post("/api/insert", (req, res) => {

    const nameReviews = req.body.name;
    const messageReviews = req.body.message;
    const ratingReviews = req.body.rating;
    const sqlInsert = "INSERT INTO `Reviews` (name ,message, rating) VALUES (?,?,?);"
    dbComments.query(sqlInsert, [nameReviews, messageReviews, ratingReviews], (err, result) => {
      if (err) {
        res.send({ message: "Erreur, Veuillez réessayer" });
      } else {
        res.send({ message: "Commentaire envoyé!" })
      }
    })
  
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM `Reviews` WHERE id = ?";

  dbComments.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err)
  })
})

app.put("/api/update", (req, res) => {
  const message = req.body.message;
  const id = req.body.id;
  const sqlUpdate = "UPDATE `Reviews` SET message = ? WHERE id = ?";

  dbComments.query(sqlUpdate, [message, id], (err, result) => {
    if (err) console.log(err)
  })
})


// ========= SERVER-SIDE FOR OPENNINGTIME =========

const dbOpeningTime = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'Schedule',
});

app.get('/get/opening', (req, res) => {
  const sqlSelectFooter = "SELECT * FROM `scheduleFooter`";
  dbOpeningTime.query(sqlSelectFooter, (err, result) => {
    res.send(result)
  });
})

app.put("/update/opening", (req, res) => {
  const openingTime = req.body.openingTime;
  const id = req.body.id;
  const sqlUpdateOpenning = "UPDATE `scheduleFooter` SET openingTime = ? WHERE id = ?";
  dbOpeningTime.query(sqlUpdateOpenning, [openingTime, id], (err, result) => {
    if (err) console.log(err)
  })
})


// ========= LISTENNING SERVER =========
app.listen(3002, () => {
  console.log("running server")
});