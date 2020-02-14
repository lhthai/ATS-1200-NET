"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printVoucher = exports.checkPrinterStatus = void 0;

var _escpos = _interopRequireDefault(require("escpos"));

var _logger = _interopRequireDefault(require("./logger"));

var checkPrinterStatus = function checkPrinterStatus(io) {
  setInterval(function () {
    try {
      var device = new _escpos["default"].USB();
      var options = {
        encoding: 'EUC-JP'
      };
      var printer = new _escpos["default"].Printer(device, options);
      device.open(function () {
        printer.close();
        io.sockets.emit('printerReady', true);

        _logger["default"].info('Printer connected');
      });
    } catch (error) {
      io.sockets.emit('printerReady', false); //  logger.error(error.toString())
    }
  }, 1000);
};

exports.checkPrinterStatus = checkPrinterStatus;

var printVoucher = function printVoucher(data) {
  var device = new _escpos["default"].USB();
  var options = {
    encoding: 'EUC-JP'
  };
  var printer = new _escpos["default"].Printer(device, options);

  try {
    if (data.updatedAt !== undefined) {
      device.open(function () {
        printer.font('b').size(2, 2).align('ct').text('ATS-1200-NET').control('LF').size(1, 1).table([data.updatedAt.slice(0, 19), "No: ".concat(data.slipNo, " ").concat(data.edited ? '   (Edited)' : '')]).control('LF').table(['Truck No:', data.carNumber]).table(['Brand:', data.brandCode]).table(['Vendor:', data.vendorCode]).table(['Destination:', data.destinationCode]).table(['Other:', data.otherCode]).table(['Empty Weight:', data.emptyWeight]).table(['Gross Weight:', data.grossWeight]).table(['Net Weight:', data.correctionNet]).control('LF').align('ct').text('https://www.tanaka-scale.co.jp/').println('\n') // println to avoid missing content when cut paper. **Do not delete this command**
        .print('\x1b'.concat('\x69')) // command to cut the paper
        .close();
      });
    } else {
      _logger["default"].error('Print error');
    }
  } catch (error) {
    _logger["default"].error('Print error');
  }
};

exports.printVoucher = printVoucher;