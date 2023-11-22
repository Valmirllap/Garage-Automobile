const mysql = require('mysql2');

// ==================== CONNECTION MYSQL: Services ====================
const dbServices = mysql.createConnection({
  user: process.env.MYSQL_USER || "root",
  host: process.env.MYSQL_HOST || "localhost",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "CrudComments",
});

// ==================== CREATE SERVICES ====================
function servicePost(req, res) {
  const { image, title, price } = req.body;
  const sqlInsert = 'INSERT INTO `services` (image, title, price) VALUES (?,?,?);'

  dbServices.query(sqlInsert, [image, title, price], (err, result) => {
    if(err) {
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "Nouveau service ajoutée" });
    }
  })
}

// ==================== RETRIEVE SERVICES ==================
function serviceGet(req, res) {
  const sqlSelect = "SELECT * FROM `services`";

  dbServices.query(sqlSelect, (err, result) => {
    res.send(result)
  });
}

// ==================== UPDATE SERVICES ====================
function servicePut(req, res) {
  const { id, image, title, price } = req.body;

  const sqlUdpate = 'UPDATE `services` SET ? WHERE id = ?';

  const updateFields = {};
  if (image) updateFields.image = image;
  if (title) updateFields.title = title; 
  if (price) updateFields.price = price;

  dbServices.query(sqlUdpate, [updateFields, id], (err, result) => {
    if (err) {
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "Service mise à jour" });
    }
  })
}

// ==================== DELETE SERVICES ====================
function serviceDelete(req, res) {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM `services` WHERE id = ?";

  dbServices.query(sqlDelete, id, (err, result) => {
    if (err){
      res.send({ message: "Erreur veuillez réessayer" });
    } else {
      res.send({ message: "Service supprimer" });
    }
  })
}

module.exports = { servicePost, serviceGet, servicePut, serviceDelete }