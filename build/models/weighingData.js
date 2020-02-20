"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var schema = new _mongoose["default"].Schema({
  slipNo: Number,
  numberingType: Number,
  truckNumber: String,
  brandCode: String,
  brand: String,
  vendorCode: String,
  vendor: String,
  destinationCode: String,
  destination: String,
  otherCode: String,
  other: String,
  emptyWeight: Number,
  emptyTime: String,
  grossWeight: Number,
  grossTime: String,
  netWeight: Number,
  correctionNet: Number,
  edited: Boolean
}, {
  timestamps: true
});
module.exports = _mongoose["default"].model('WeighingData', schema);