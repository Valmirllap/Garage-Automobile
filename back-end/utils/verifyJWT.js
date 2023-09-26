const jwt = require('jsonwebtoken');

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

module.exports = { verifyJWT };