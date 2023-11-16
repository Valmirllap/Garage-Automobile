const express = require("express");
const cors = require('cors');
const path = require('path');

// ========= AUTHORISATION =========
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MemoryStore = require('memorystore')(session)

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
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
}))

app.use(express.static('build'));

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

// ========= SERVER-SIDE FOR CAR PICTURES =========
const carsPicturesRoute = require("./routes/carPics");
carsPicturesRoute(app);

// ========= SERVER-SIDE FOR SMALL CAR DETAILS =========
const smallDetailsRoute = require("./routes/carSmallDetails");
smallDetailsRoute(app);

// ========= SERVER-SIDE FOR GENERAL DATA ONE =========
const generalDataOneRoute = require("./routes/generalDataOne");
generalDataOneRoute(app);


// if react router, then add this
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})

// ========= LISTENNING SERVER =========
const port = process.env.PORT || 3002
app.listen(port, () => {
  console.log("running server")
});