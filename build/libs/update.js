"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _child_process = require("child_process");

var _aws = _interopRequireDefault(require("./aws"));

var _logger = _interopRequireDefault(require("./logger"));

var updateApplication = function updateApplication(socket) {
  (0, _aws["default"])(function () {
    (0, _child_process.exec)('unzip -o /var/www/Latest.zip -d /var/www/ats && cd /var/www/ats/server && npm install', function (error) {
      if (error) {
        socket.emit('updateError');

        _logger["default"].error(error);
      } else {
        socket.emit('updateComplete');

        _logger["default"].info('Update successfully');
      }
    });
  });
};

var _default = updateApplication;
exports["default"] = _default;