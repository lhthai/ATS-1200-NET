"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = require("winston");

var _path = _interopRequireDefault(require("path"));

var formatTime = function formatTime() {
  var date = new Date();
  var hour = date.getHours();
  hour = (hour < 10 ? '0' : '') + hour;
  var min = date.getMinutes();
  min = (min < 10 ? '0' : '') + min;
  var sec = date.getSeconds();
  sec = (sec < 10 ? '0' : '') + sec;
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10 ? '0' : '') + month;
  var day = date.getDate();
  day = (day < 10 ? '0' : '') + day;
  var millisecond = date.getMilliseconds();
  return "".concat(day, "-").concat(month, "-").concat(year, " ").concat(hour, ":").concat(min, ":").concat(sec, ".").concat(millisecond);
};

var customFormat = _winston.format.printf(function (_ref) {
  var level = _ref.level,
      message = _ref.message;
  return "[".concat(formatTime(), "] ").concat(level.toLocaleUpperCase(), " ").concat(message);
});

var logger = (0, _winston.createLogger)({
  exitOnError: false,
  format: customFormat,
  colorize: true
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new _winston.transports.Console({}));
} else {
  logger.add(new _winston.transports.File({
    filename: _path["default"].resolve(__dirname, '../', 'storage/logs', 'output.log'),
    maxsize: 10240
  }));
}

var _default = logger;
exports["default"] = _default;