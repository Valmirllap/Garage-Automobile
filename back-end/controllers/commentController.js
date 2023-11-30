const dbComments = require('../mysql/services');

// ==================== CREATE COMMENTS ====================
function commentsCreate(req, res) {
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
}

// ==================== READ COMMENTS ====================
function commentsGet(req, res) {
  const sqlSelect = "SELECT * FROM `Reviews`";

  dbComments.query(sqlSelect, (err, result) => {
    res.send(result)
  });
}

// ==================== UPDATE COMMENTS ====================
function commentsUpdate(req, res) {
  const message = req.body.message;
  const id = req.body.id;
  const sqlUpdate = "UPDATE `Reviews` SET message = ? WHERE id = ?";

  dbComments.query(sqlUpdate, [message, id], (err, result) => {
    if (err) console.log(err)
  })
}

// ==================== DELETE COMMENTS ====================
function commentsDelete(req, res) {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM `Reviews` WHERE id = ?";

  dbComments.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err)
  })
}

module.exports = { commentsCreate, commentsGet, commentsUpdate, commentsDelete };