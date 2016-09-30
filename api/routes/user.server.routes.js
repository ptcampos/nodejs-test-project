'use strict';

var users = require('../controllers/users.server.controller');

module.exports = function (app) {
  // Setting up the users authentication api
  app.route('/api/auth/signup').post(users.signup);
  app.route('/api/auth/signin').post(users.signin);
  app.route('/api/auth/signout').get(users.signout);
  app.route('/api/auth/me').get(users.me);
};
