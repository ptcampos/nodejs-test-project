'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  User = require('mongoose').model('User'),
  path = require('path');

/**
 * Module init function.
 */
module.exports = function (app) {
  // Serialize sessions
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  // Deserialize sessions
  passport.deserializeUser(function (id, done) {
    User.findOne({
      _id: id
    }, '-salt -password', function (err, user) {
      done(err, user);
    });
  });

  // Initialize strategies
  require( path.resolve( './api/config/strategies/local.server.strategy' ) )();

  // Add passport's middleware
  app.use(passport.initialize());
  app.use(passport.session());
};
