"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.report = exports.getWeighingByDate = exports.getStayingTrucks = exports.update = exports.remove = exports.getAll = exports.getMaxSlipNo = exports.create = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _weighingData = _interopRequireDefault(require("../models/weighingData"));

var _operationSetting = _interopRequireDefault(require("../models/settings/operationSetting"));

var _logger = _interopRequireDefault(require("../libs/logger"));

var create =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var weight, newWeight;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            weight = new _weighingData["default"]({
              slipNo: req.body.slipNo,
              numberingType: req.body.numberingType,
              truckNumber: req.body.truckNumber,
              brandCode: req.body.brandCode,
              brand: req.body.brand,
              vendorCode: req.body.vendorCode,
              vendor: req.body.vendor,
              destinationCode: req.body.destinationCode,
              destination: req.body.destination,
              otherCode: req.body.otherCode,
              other: req.body.other,
              emptyWeight: req.body.emptyWeight,
              emptyTime: req.body.emptyTime,
              grossWeight: req.body.grossWeight,
              grossTime: req.body.grossTime,
              correctionNet: req.body.correctionNet,
              edited: false
            });
            _context.prev = 1;
            _context.next = 4;
            return weight.save();

          case 4:
            newWeight = _context.sent;
            res.status(200).json(newWeight);
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
}(); // Return max Slip No of today


exports.create = create;

var getMaxSlipNo =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var date, temp, slipNoStart, documentNumbering, result, _result, slipNo, _result2, _slipNo;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            date = new Date().toISOString().slice(0, 10);
            _context2.prev = 1;
            _context2.next = 4;
            return _operationSetting["default"].find({});

          case 4:
            temp = _context2.sent;
            slipNoStart = parseInt(temp[0].weighingOperationSetting.slipNoStart, 10);
            documentNumbering = parseInt(temp[0].weighingOperationSetting.documentNumbering, 10);

            if (!(slipNoStart === 0)) {
              _context2.next = 14;
              break;
            }

            _context2.next = 10;
            return _weighingData["default"].find({
              updatedAt: {
                $gte: date,
                $lt: new Date(date).setDate(new Date(date).getDate() + 1)
              },
              numberingType: 0
            }).sort({
              slipNo: -1
            }).limit(1);

          case 10:
            result = _context2.sent;

            if (result.length > 0) {
              res.status(200).json(parseInt(result[0].slipNo, 10) + 1);
            } else {
              res.status(200).json(1);
            }

            _context2.next = 28;
            break;

          case 14:
            if (!(slipNoStart === 1)) {
              _context2.next = 22;
              break;
            }

            _context2.next = 17;
            return _weighingData["default"].find({
              updatedAt: {
                $gte: date,
                $lt: new Date(date).setDate(new Date(date).getDate() + 1)
              },
              numberingType: 1
            }).sort({
              slipNo: -1
            }).limit(1);

          case 17:
            _result = _context2.sent;
            slipNo = parseInt(_result[0].slipNo, 10);

            if (_result.length > 0) {
              if (slipNo < documentNumbering) {
                res.status(200).json(documentNumbering);
              } else {
                res.status(200).json(slipNo + 1);
              }
            } else {
              res.status(200).json(documentNumbering);
            }

            _context2.next = 28;
            break;

          case 22:
            if (!(slipNoStart === 2)) {
              _context2.next = 28;
              break;
            }

            _context2.next = 25;
            return _weighingData["default"].find({
              numberingType: 2
            }).sort({
              slipNo: -1
            }).limit(1);

          case 25:
            _result2 = _context2.sent;
            _slipNo = parseInt(_result2[0].slipNo, 10);

            if (_result2.length > 0) {
              if (documentNumbering > _slipNo) {
                res.status(200).json(documentNumbering);
              } else {
                res.status(200).json(_slipNo + 1);
              }
            } else {
              res.status(200).json(documentNumbering);
            }

          case 28:
            _context2.next = 34;
            break;

          case 30:
            _context2.prev = 30;
            _context2.t0 = _context2["catch"](1);
            res.status(500).json(_context2.t0);

            _logger["default"].error(_context2.t0);

          case 34:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 30]]);
  }));

  return function getMaxSlipNo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getMaxSlipNo = getMaxSlipNo;

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
            return _weighingData["default"].find({
              emptyWeight: {
                $gt: 0
              }
            });

          case 3:
            result = _context3.sent;
            res.status(200).json(result);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json(_context3.t0);

          case 10:
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
    var weight;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _weighingData["default"].findByIdAndRemove({
              _id: req.params.id
            });

          case 3:
            weight = _context4.sent;
            res.status(200).json(weight);
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
    var item, weight;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            item = req.body;
            delete item._id; // Delete _id from req.body because in Mongo 2.4, can not update _id field

            _context5.next = 5;
            return _weighingData["default"].findOneAndUpdate({
              _id: req.params.id
            }, item, {
              "new": false
            });

          case 5:
            weight = _context5.sent;
            res.status(200).json(weight);
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

var getStayingTrucks =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _weighingData["default"].find({
              emptyWeight: null
            });

          case 3:
            result = _context6.sent;
            res.status(200).json(result);
            _context6.next = 11;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            res.status(500).json(_context6.t0);

            _logger["default"].error(_context6.t0);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function getStayingTrucks(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getStayingTrucks = getStayingTrucks;

var getWeighingByDate =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(req, res) {
    var date, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            date = new Date(req.params.date).toISOString().slice(0, 10);
            _context7.prev = 1;
            _context7.next = 4;
            return _weighingData["default"].find({
              emptyWeight: {
                $gte: 0
              },
              updatedAt: {
                $gte: date,
                $lt: new Date(date).setDate(new Date(date).getDate() + 1)
              }
            });

          case 4:
            result = _context7.sent;
            res.status(200).json(result);
            _context7.next = 12;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](1);
            res.status(500).json(_context7.t0);

            _logger["default"].error(_context7.t0);

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 8]]);
  }));

  return function getWeighingByDate(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getWeighingByDate = getWeighingByDate;

var report =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(req, res) {
    var _req$params, firstItem, secondItem, from, to, fromDate, toDate, twoItems, oneItem, result;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _req$params = req.params, firstItem = _req$params.firstItem, secondItem = _req$params.secondItem, from = _req$params.from, to = _req$params.to;
            fromDate = new Date(from);
            fromDate.setHours(0, 0, 0);
            toDate = new Date(to);
            toDate.setHours(23, 59, 59); // Querying 2 items at the same time

            twoItems = [{
              $match: {
                emptyWeight: {
                  $gte: 0
                },
                updatedAt: {
                  $gte: fromDate,
                  $lte: toDate
                }
              }
            }, {
              $group: {
                _id: {
                  firstItem: "$".concat(firstItem),
                  secondItem: "$".concat(secondItem)
                },
                brandCode: {
                  $first: '$brandCode'
                },
                vendorCode: {
                  $first: '$vendorCode'
                },
                destinationCode: {
                  $first: '$destinationCode'
                },
                otherCode: {
                  $first: '$otherCode'
                },
                totalCount: {
                  $sum: 1
                },
                totalWeight: {
                  $sum: '$correctionNet'
                }
              }
            } // { $sort: { "_id.firstItem": 1 } }
            ]; // Querying 1 item

            oneItem = [{
              $match: {
                emptyWeight: {
                  $gte: 0
                },
                updatedAt: {
                  $gte: fromDate,
                  $lte: toDate
                }
              }
            }, {
              $group: {
                _id: "$".concat(firstItem),
                brandCode: {
                  $first: '$brandCode'
                },
                vendorCode: {
                  $first: '$vendorCode'
                },
                destinationCode: {
                  $first: '$destinationCode'
                },
                otherCode: {
                  $first: '$otherCode'
                },
                totalCount: {
                  $sum: 1
                },
                totalWeight: {
                  $sum: '$correctionNet'
                }
              }
            } // { $sort: { _id: 1 } }
            ];
            _context8.prev = 7;

            if (!(secondItem === undefined)) {
              _context8.next = 14;
              break;
            }

            _context8.next = 11;
            return _weighingData["default"].aggregate(oneItem);

          case 11:
            result = _context8.sent;
            _context8.next = 17;
            break;

          case 14:
            _context8.next = 16;
            return _weighingData["default"].aggregate(twoItems);

          case 16:
            result = _context8.sent;

          case 17:
            res.status(200).json(result);
            _context8.next = 24;
            break;

          case 20:
            _context8.prev = 20;
            _context8.t0 = _context8["catch"](7);
            res.status(500).json(_context8.t0);

            _logger["default"].error(_context8.t0);

          case 24:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[7, 20]]);
  }));

  return function report(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.report = report;