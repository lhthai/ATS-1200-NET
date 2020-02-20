"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _operationSetting = require("../controllers/settings/operationSetting");

var itemOperationSetting = _interopRequireWildcard(require("../controllers/settings/itemOperationSetting"));

var _backupSetting = require("../controllers/settings/backupSetting");

var router = _express["default"].Router();

router.get('/operationsetting', _operationSetting.get);
router.put('/operationsetting/:id', _operationSetting.update);
router.get('/getserialports', _operationSetting.getSerialPorts); // router.put('/updateslipptinter/:id', operationSetting.updateSlipPrinter)

router.get('/itemoperationsetting', itemOperationSetting.get);
router.put('/itemoperationsetting/:id', itemOperationSetting.update);
router.get('/getusbdrives', _backupSetting.getUSBDrives);
router.get('/adcount', _operationSetting.getADCount);
router.get('/readadcount/:date', _operationSetting.readADCountByDate);
module.exports = router;