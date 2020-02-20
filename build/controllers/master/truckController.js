"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.remove = exports.getAll = exports.get = exports.create = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _truckMaster = _interopRequireDefault(require("../../models/master/truckMaster"));

var _logger = _interopRequireDefault(require("../../libs/logger"));

var create =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var truck, newTruck;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            truck = new _truckMaster["default"]({
              truckNumber: req.body.truckNumber,
              brand: req.body.brand,
              brandCode: req.body.brandCode,
              vendor: req.body.vendor,
              vendorCode: req.body.vendorCode,
              destination: req.body.destination,
              destinationCode: req.body.destinationCode,
              other: req.body.other,
              otherCode: req.body.otherCode,
              emptyWeight: req.body.emptyWeight,
              maximumWeight: req.body.maximumWeight
            });
            _context.prev = 1;
            _context.next = 4;
            return truck.save();

          case 4:
            newTruck = _context.sent;
            res.status(200).json(newTruck);
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            res.status(500).json(_context.t0);

            _logger["default"].error(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.create = create;

var get =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _truckMaster["default"].find({
              truckNumber: req.params.truckNumber
            });

          case 3:
            result = _context2.sent;
            res.status(200).json(result);
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json(_context2.t0);

            _logger["default"].error(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function get(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.get = get;

var getAll =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _truckMaster["default"].find({});

          case 3:
            result = _context3.sent;
            res.status(200).json(result);
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

  return function getAll(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getAll = getAll;

var remove =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var truck;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _truckMaster["default"].findByIdAndRemove({
              _id: req.params.id
            });

          case 3:
            truck = _context4.sent;
            res.status(200).json(truck);
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

  return function remove(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.remove = remove;

var update =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res) {
    var item, truck;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            item = req.body;
            delete item._id; // Delete _id from req.body because in Mongo 2.4, can not update _id field

            _context5.next = 5;
            return _truckMaster["default"].findOneAndUpdate({
              _id: req.params.id
            }, item, {
              "new": true
            });

          case 5:
            truck = _context5.sent;
            res.status(200).json(truck);
            _context5.next = 13;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json(_context5.t0);

            _logger["default"].error(_context5.t0);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 9]]);
  }));

  return function update(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.update = update;