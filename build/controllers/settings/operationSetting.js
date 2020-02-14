"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readADCountByDate = exports.getADCount = exports.getSerialPorts = exports.get = exports.update = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _serialport = _interopRequireDefault(require("serialport"));

var _operationSetting = _interopRequireDefault(require("../../models/settings/operationSetting"));

var _adCount = _interopRequireDefault(require("../../models/settings/adCount"));

var _logger = _interopRequireDefault(require("../../libs/logger"));

var update =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var item, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            item = req.body;
            delete item._id; // Delete _id from req.body because in Mongo 2.4, can not update _id field

            _context.next = 5;
            return _operationSetting["default"].findOneAndUpdate({
              _id: req.params.id
            }, item, {
              "new": true
            });

          case 5:
            result = _context.sent;
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

  return function update(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.update = update;

var get =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var count, item, newItem, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _operationSetting["default"].count({});

          case 2:
            count = _context2.sent;

            if (!(count === 0)) {
              _context2.next = 18;
              break;
            }

            _context2.prev = 4;
            item = new _operationSetting["default"]({
              indicatorSetting: {
                portName: 'COM1',
                baudRate: 9600,
                parity: 'even',
                dataBits: 7,
                stopBits: 1
              },
              slipPrinterSetting: {
                portName: 'COM2',
                baudRate: 9600,
                parity: 'even',
                dataBits: 8,
                stopBits: 1
              },
              weighingOperationSetting: {
                weighingStartWeight: 200,
                slipNoStart: 0,
                documentNumbering: 1
              },
              maintenanceDataUpload: {
                isEnabling: false,
                uploadInterval: 1
              }
            });
            _context2.next = 8;
            return item.save();

          case 8:
            newItem = _context2.sent;
            res.status(200).json(newItem);
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](4);
            res.status(500).json(_context2.t0);

            _logger["default"].error(_context2.t0);

          case 16:
            _context2.next = 22;
            break;

          case 18:
            _context2.next = 20;
            return _operationSetting["default"].find({});

          case 20:
            result = _context2.sent;

            try {
              res.status(200).json(result);
            } catch (error) {
              res.status(500).json(error);

              _logger["default"].error(error);
            }

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 12]]);
  }));

  return function get(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.get = get;

var getSerialPorts =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var ports;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _serialport["default"].list();

          case 3:
            ports = _context3.sent;
            res.status(200).json(ports);
            _context3.next = 11;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json(_context3.t0);

            _logger["default"].error(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function getSerialPorts(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getSerialPorts = getSerialPorts;

var getADCount =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _adCount["default"].find({});

          case 3:
            result = _context4.sent;
            res.status(200).json(result);
            _context4.next = 11;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json(_context4.t0);

            _logger["default"].error(_context4.t0);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function getADCount(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getADCount = getADCount;

var readADCountByDate =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res) {
    var fromDate, toDate, query, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            fromDate = new Date(req.params.date);
            fromDate.setHours(0, 0, 0);
            toDate = new Date(req.params.date);
            toDate.setHours(23, 59, 59);
            query = {
              createdAt: {
                $gte: fromDate,
                $lt: toDate
              }
            };
            _context5.prev = 5;
            _context5.next = 8;
            return _adCount["default"].find(query);

          case 8:
            result = _context5.sent;
            res.status(200).json(result);
            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](5);
            res.status(500).json(_context5.t0);

            _logger["default"].error(_context5.t0);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[5, 12]]);
  }));

  return function readADCountByDate(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.readADCountByDate = readADCountByDate;