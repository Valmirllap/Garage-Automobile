const { servicePost, serviceGet, servicePut, serviceDelete } = require('../controllers/servicesController');

function services(app) {

  // ============ ROUTE: CREATE SERVICES ============
  app.post('/service/add', servicePost);

  // ============ ROUTE: RETRIEVE SERVICES ==========
  app.get('/service/get', serviceGet);

  // ============ ROUTE: UPDATE SERVICES ============
  app.put('/service/update', servicePut);

  // ============ ROUTE: DELETE SERVICES ============
  app.delete('/service/delete/:id', serviceDelete);

}

module.exports = services