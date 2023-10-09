const express = require("express");
const cors = require('cors');

// ========= AUTHORISATION =========
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// ========= MIDDLEWARES =========
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
// ========= MIDDLEWARE SESSION =========
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
const userRoute = require("./routes/user");
userRoute(app);

// ========= SERVER-SIDE FOR COMMENTS =========
const commentsRoute = require("./routes/comments");
commentsRoute(app);

// ========= SERVER-SIDE FOR OPENNINGTIME =========
const scheduleRoute = require("./routes/schedule");
scheduleRoute(app);

// ========= SERVER-SIDE FOR EQUIPMENTS =========
const EquipmentsRoute = require("./routes/equipmentCar");
EquipmentsRoute(app);

// ========= SERVER-SIDE FOR CAR DATA INFO =========
const CarsInfoRoute = require("./routes/carDataInfo");
CarsInfoRoute(app);

// ========= LISTENNING SERVER =========
app.listen(3002, () => {
  console.log("running server")
});