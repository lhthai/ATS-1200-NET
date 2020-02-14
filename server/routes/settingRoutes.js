import express from 'express';

import {
  get,
  update,
  getSerialPorts,
  getADCount,
  readADCountByDate,
} from '../controllers/settings/operationSetting';
import * as itemOperationSetting from '../controllers/settings/itemOperationSetting';
import { getUSBDrives } from '../controllers/settings/backupSetting';

const router = express.Router();

router.get('/operationsetting', get);
router.put('/operationsetting/:id', update);
router.get('/getserialports', getSerialPorts);
// router.put('/updateslipptinter/:id', operationSetting.updateSlipPrinter)

router.get('/itemoperationsetting', itemOperationSetting.get);
router.put('/itemoperationsetting/:id', itemOperationSetting.update);

router.get('/getusbdrives', getUSBDrives);
router.get('/adcount', getADCount);
router.get('/readadcount/:date', readADCountByDate);

module.exports = router;
