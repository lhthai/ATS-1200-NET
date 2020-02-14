"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restoreMongo = exports.backupMongo = void 0;

var _child_process = require("child_process");

var _fs = _interopRequireDefault(require("fs"));

var backupMongo = function backupMongo(path, socket) {
  (0, _child_process.exec)("mongodump -d ats-1200 -o ".concat(path), function (error) {
    if (error) {
      socket.emit('backupError');
    }

    socket.emit('backupComplete');
  });
};

exports.backupMongo = backupMongo;

var restoreMongo = function restoreMongo(data, socket) {
  try {
    if (_fs["default"].existsSync(data.path)) {
      if (data.item.setting === false) {
        (0, _child_process.exec)("mongorestore -d ats-1200 --nsExclude 'ats-1200.*settings' ".concat(data.path), function (error) {
          if (error) {
            socket.emit('restoreError');
          }

          socket.emit('restoreComplete');
        });
      } else {
        (0, _child_process.exec)("mongorestore --drop -d ats-1200 ".concat(data.path), function (error) {
          if (error) {
            socket.emit('restoreError');
          }

          socket.emit('restoreComplete');
        });
      }
    } else {
      socket.emit('dataNotFound');
    }
  } catch (err) {
    socket.emit('restoreError');
  }
};

exports.restoreMongo = restoreMongo;