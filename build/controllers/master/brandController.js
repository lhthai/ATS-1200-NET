"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.remove = exports.get = exports.getAll = exports.create = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _brandMaster = _interopRequireDefault(require("../../models/master/brandMaster"));

var _logger = _interopRequireDefault(require("../../libs/logger"));

var create =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var _req$body, code, name, temp, brand, newBrand;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, code = _req$body.code, name = _req$body.name;
            _context.next = 3;
            return _brandMaster["default"].findOne({
              code: code
            });

          case 3:
            temp = _context.sent;

            if (!temp) {
              _context.next = 8;
              break;
            }

            res.status(500).json({
              message: 'This code is already exists!'
            });
            _context.next = 20;
            break;

          case 8:
            _context.prev = 8;
            brand = new _brandMaster["default"]({
              code: code,
              name: name
            });
            _context.next = 12;
            return brand.save();

          case 12:
            newBrand = _context.sent;
            res.status(200).json(newBrand);
            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](8);
            res.status(500).json(_context.t0);

            _logger["default"].error(_context.t0);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 16]]);
  }));

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.create = create;

var getAll =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var brands;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _brandMaster["default"].find({});

          case 3:
            brands = _context2.sent;
            res.status(200).json(brands);
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

  return function getAll(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAll = getAll;

var get =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var brand;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _brandMaster["default"].find({
              code: req.params.code
            });

          case 3:
            brand = _context3.sent;
            res.status(200).json(brand);
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

  return function get(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.get = get;

var remove =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var brand;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _brandMaster["default"].findByIdAndRemove({
              _id: req.params.id
            });

          case 3:
            brand = _context4.sent;
            res.status(200).json(brand);
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
    var item, brand;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            item = req.body;
            delete item._id; // Delete _id from req.body because in Mongo 2.4, can not update _id field

            _context5.next = 5;
            return _brandMaster["default"].findOneAndUpdate({
              _id: req.params.id
            }, item, {
              "new": true
            });

          case 5:
            brand = _context5.sent;
            res.status(200).json(brand);
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