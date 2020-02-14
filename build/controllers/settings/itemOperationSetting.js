"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.get = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _itemOperationSetting = _interopRequireDefault(require("../../models/settings/itemOperationSetting"));

var _logger = _interopRequireDefault(require("../../libs/logger"));

var get =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var count, newItem, result, _result;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _itemOperationSetting["default"].count({});

          case 2:
            count = _context.sent;

            if (!(count === 0)) {
              _context.next = 18;
              break;
            }

            _context.prev = 4;
            newItem = new _itemOperationSetting["default"]({
              item1: {
                name: 'Truck Number',
                display: true,
                require: false
              },
              item2: {
                name: 'Brand',
                display: true,
                require: false
              },
              item3: {
                name: 'Vendor',
                display: true,
                require: false
              },
              item4: {
                name: 'Destination',
                display: true,
                require: false
              },
              item5: {
                name: 'Other',
                display: true,
                require: false
              },
              item6: {
                name: 'Other 2',
                display: false,
                require: false
              }
            });
            _context.next = 8;
            return newItem.save();

          case 8:
            result = _context.sent;
            res.status(200).json(result);
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](4);
            res.status(500).json(_context.t0);

            _logger["default"].error(_context.t0);

          case 16:
            _context.next = 29;
            break;

          case 18:
            _context.prev = 18;
            _context.next = 21;
            return _itemOperationSetting["default"].find({});

          case 21:
            _result = _context.sent;
            res.status(200).json(_result);
            _context.next = 29;
            break;

          case 25:
            _context.prev = 25;
            _context.t1 = _context["catch"](18);
            res.status(500).json(_context.t1);

            _logger["default"].error(_context.t1);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 12], [18, 25]]);
  }));

  return function get(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.get = get;

var update =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var item, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            item = req.body;
            delete item._id; // Delete _id from req.body because in Mongo 2.4, can not update _id field

            _context2.next = 5;
            return _itemOperationSetting["default"].findOneAndUpdate({
              _id: req.params.id
            }, item, {
              "new": true
            });

          case 5:
            result = _context2.sent;
            res.status(200).json(result);
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json(_context2.t0);

            _logger["default"].error(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function update(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.update = update;