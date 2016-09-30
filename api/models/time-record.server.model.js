'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * TimeRecord Schema
 */
var TimeRecordSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('TimeRecord', TimeRecordSchema);
