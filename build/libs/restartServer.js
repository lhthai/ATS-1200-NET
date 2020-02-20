"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.restartServer = void 0;

var _child_process = require("child_process");

var restartServer = function restartServer() {
  (0, _child_process.exec)('pm2 reload ATS');
};

exports.restartServer = restartServer;
var _default = restartServer;
exports["default"] = _default;