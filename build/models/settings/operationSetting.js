"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var schema = new _mongoose["default"].Schema({
  indicatorSetting: {
    portName: {
      type: String,
      required: true
    },
    baudRate: {
      type: Number,
      required: true
    },
    parity: {
      type: String,
      required: true
    },
    dataBits: {
      type: Number,
      required: true
    },
    stopBits: {
      type: Number,
      required: true
    }
  },
  slipPrinterSetting: {
    portName: {
      type: String,
      required: true
    },
    baudRate: {
      type: Number,
      required: true
    },
    parity: {
      type: String,
      required: true
    },
    dataBits: {
      type: Number,
      required: true
    },
    stopBits: {
      type: Number,
      required: true
    }
  },
  weighingOperationSetting: {
    weighingStartWeight: {
      type: Number,
      required: true
    },
    slipNoStart: {
      type: Number,
      required: true
    },
    documentNumbering: {
      type: Number,
      required: true
    }
  },
  maintenanceDataUpload: {
    isEnabling: Boolean,
    uploadInterval: Number
  }
}, {
  timestamps: true
});
module.exports = _mongoose["default"].model('OperationSetting', schema);