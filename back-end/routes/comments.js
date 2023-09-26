const { commentsCreate, commentsGet, commentsUpdate, commentsDelete } = require("../controllers/commentController")

function commentsRoute (app) {
  // ============ ROUTE: CREATE COMMENTS ============
  app.post("/api/insert", commentsCreate);

  // ============ ROUTE: READ COMMENTS ============
  app.get("/api/get", commentsGet);

  // ============ ROUTE: UPDATE COMMENTS ============
  app.put("/api/update", commentsUpdate);

  // ============ ROUTE: DELETE COMMENTS ============
  app.delete("/api/delete/:id", commentsDelete);

}

module.exports = commentsRoute;