'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  TimeRecord = mongoose.model('TimeRecord'),
  errorHandler = require('./errors.server.controller');

/**
 * Create a timeRecord
 */
exports.create = function (req, res) {
  var timeRecord = new TimeRecord(req.body);
  timeRecord.user = req.user;

  timeRecord.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(timeRecord);
    }
  });
};

/**
 * Show the current timeRecord
 */
exports.read = function (req, res) {
  res.json(req.timeRecord);
};

/**
 * Update a timeRecord
 */
exports.update = function (req, res) {
  var timeRecord = req.timeRecord;

  timeRecord.date = req.body.date;
  timeRecord.time = req.body.totalTime;
  timeRecord.description = req.body.description;

  timeRecord.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(timeRecord);
    }
  });
};

/**
 * Delete an timeRecord
 */
exports.delete = function (req, res) {
  var timeRecord = req.timeRecord;

  timeRecord.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(timeRecord);
    }
  });
};

/**
 * List of TimeRecords
 */
exports.list = function (req, res) {
  TimeRecord.find(req.query).sort('nome').populate('user', 'displayName').exec(function (err, timeRecords) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(timeRecords);
    }
  });
};

/**
 * TimeRecord middleware
 */
exports.timeRecordByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'TimeRecord is invalid'
    });
  }

  TimeRecord.findById(id).populate('user', 'displayName').exec(function (err, timeRecord) {
    if (err) {
      return next(err);
    } else if (!timeRecord) {
      return res.status(404).send({
        message: 'No timeRecord with that identifier has been found'
      });
    }
    req.timeRecord = timeRecord;
    next();
  });
};
