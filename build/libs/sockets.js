"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _restartServer = require("./restartServer");

var _mongodb = require("./mongodb");

var _update = _interopRequireDefault(require("./update"));

var _printer = require("./printer");

var _aws = _interopRequireDefault(require("./aws"));

var sockets = function sockets(io) {
  io.on('connection', function (socket) {
    socket.on('restartServer', function () {
      (0, _restartServer.restartServer)();
    });
    socket.on('startBackup', function (data) {
      (0, _mongodb.backupMongo)(data, socket);
    });
    socket.on('startUploadAWS', function () {
      (0, _aws["default"])(socket);
    });
    socket.on('startRestore', function (data) {
      (0, _mongodb.restoreMongo)(data, socket);
    });
    socket.on('startUpdate', function () {
      (0, _update["default"])(socket);
    });
    socket.on('printVoucher', function (data) {
      (0, _printer.printVoucher)(data);
    });
  });
};

var _default = sockets;
exports["default"] = _default;