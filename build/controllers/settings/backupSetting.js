"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getUSBDrives = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var drivelist = _interopRequireWildcard(require("drivelist"));

var _logger = _interopRequireDefault(require("../../libs/logger"));

var getUSBDrives =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var drives, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return drivelist.list();

          case 3:
            drives = _context.sent;
            result = [];
            drives.map(function (drive) {
              if (drive.isUSB) {
                result.push(drive);
              }

              return result;
            });
            res.status(200).json(result);
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            res.status(500).json(_context.t0);

            _logger["default"].error(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function getUSBDrives(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUSBDrives = getUSBDrives;
var _default = getUSBDrives;
exports["default"] = _default;