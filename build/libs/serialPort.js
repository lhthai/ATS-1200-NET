"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.handleIndicator = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _serialport = _interopRequireDefault(require("serialport"));

var _parserReadline = _interopRequireDefault(require("@serialport/parser-readline"));

var _operationSetting = _interopRequireDefault(require("../models/settings/operationSetting"));

var _adCount = _interopRequireDefault(require("../models/settings/adCount"));

// import logger from './logger';
var parser = new _parserReadline["default"]();

var readAdCount = function readAdCount(comPort, item) {
  var isEnabling = item[0].maintenanceDataUpload.isEnabling;
  var uploadInterval = item[0].maintenanceDataUpload.uploadInterval;

  if (isEnabling) {
    setInterval(function () {
      comPort.write('A0\r\n');
    }, uploadInterval * 60 * 1000);
  }

  parser.on('data',
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(data) {
      var adCount;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(data.toString().indexOf('A0') > -1)) {
                _context.next = 4;
                break;
              }

              adCount = new _adCount["default"]({
                data: data.toString().slice(6, 14)
              });
              _context.next = 4;
              return adCount.save();

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};

var readWeight = function readWeight(comPort, io) {
  // Write command to indicator every 200ms
  setInterval(function () {
    comPort.write('RW\r\n');
  }, 200);
  parser.on('data', function (data) {
    if (data.toString().indexOf('A0') === -1) {
      io.sockets.emit('readWeight', {
        weight: data.toString().slice(7, 14).replace(/^0+/, ''),
        flag: data.toString().slice(0, 2)
      });
    }
  });
};

var handleIndicator =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(io) {
    var item, port, comPort;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _operationSetting["default"].find({});

          case 2:
            item = _context2.sent;
            port = item[0].indicatorSetting; // eslint-disable-next-line new-cap

            comPort = new _serialport["default"](port.portName, {
              baudRate: port.baudRate,
              parser: new _serialport["default"].parsers.Readline('\r\n'),
              parity: port.parity,
              stopBits: port.stopBits,
              dataBits: port.dataBits,
              autoOpen: false
            }, function (error) {
              if (error) {
                io.sockets.emit('indicatorDisconnected'); // logger.error(error.toString());
              }
            });
            comPort.open(function (error) {
              if (error) {
                io.sockets.emit('indicatorDisconnected'); // logger.error(error.toString());
              } // Parse data from Buffer to string


              comPort.pipe(parser);
              readAdCount(comPort, item);
              readWeight(comPort, io);
            });
            comPort.once('close', function () {
              io.sockets.emit('indicatorDisconnected'); // logger.info('Indicator disconnected');
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function handleIndicator(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.handleIndicator = handleIndicator;
var _default = handleIndicator;
exports["default"] = _default;