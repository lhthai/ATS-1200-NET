"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var schema = new _mongoose["default"].Schema({
  item1: {
    name: String,
    display: Boolean,
    require: Boolean
  },
  item2: {
    name: String,
    display: Boolean,
    require: Boolean
  },
  item3: {
    name: String,
    display: Boolean,
    require: Boolean
  },
  item4: {
    name: String,
    display: Boolean,
    require: Boolean
  },
  item5: {
    name: String,
    display: Boolean,
    require: Boolean
  },
  item6: {
    name: String,
    display: Boolean,
    require: Boolean
  }
}, {
  timestamps: true
});
module.exports = _mongoose["default"].model('ItemOperationSetting', schema);