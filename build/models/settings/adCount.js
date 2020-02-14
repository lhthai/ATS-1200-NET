"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var schema = new _mongoose["default"].Schema({
  data: String
}, {
  timestamps: true
});
module.exports = _mongoose["default"].model('ADCount', schema);