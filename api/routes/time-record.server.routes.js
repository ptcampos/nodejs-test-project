'use strict';

var timeRecords = require('../controllers/time-records.server.controller');

module.exports = function (app) {
  // Subcategorias collection routes
  app.route('/api/time-records')
  	.get(timeRecords.list)
    .post(timeRecords.create);

  // Single time record routes
  app.route('/api/time-records/:timeRecordId')
    .get(timeRecords.read)
    .put(timeRecords.update)
    .delete(timeRecords.delete);

  // Finish by binding the time record middleware
  app.param('timeRecordId', timeRecords.timeRecordByID);
};
