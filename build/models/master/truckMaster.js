"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var schema = new _mongoose["default"].Schema({
  truckNumber: {
    type: String,
    required: true
  },
  brand: String,
  brandCode: String,
  vendor: String,
  vendorCode: String,
  destination: String,
  destinationCode: String,
  other: String,
  otherCode: String,
  emptyWeight: Number,
  maximumWeight: Number
}, {
  timestamps: true
});
module.exports = _mongoose["default"].model('TruckMaster', schema);