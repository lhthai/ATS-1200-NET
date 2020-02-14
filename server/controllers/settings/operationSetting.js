import serialport from 'serialport';
import OperationSetting from '../../models/settings/operationSetting';
import ADCount from '../../models/settings/adCount';
import logger from '../../libs/logger';

export const update = async (req, res) => {
  try {
    const item = req.body;
    delete item._id; // Delete _id from req.body because in Mongo 2.4, can not update _id field
    const result = await OperationSetting.findOneAndUpdate(
      { _id: req.params.id },
      item,
      { new: true },
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const get = async (req, res) => {
  const count = await OperationSetting.count({});
  if (count === 0) {
    try {
      const item = new OperationSetting({
        indicatorSetting: {
          portName: 'COM1',
          baudRate: 9600,
          parity: 'even',
          dataBits: 7,
          stopBits: 1,
        },
        slipPrinterSetting: {
          portName: 'COM2',
          baudRate: 9600,
          parity: 'even',
          dataBits: 8,
          stopBits: 1,
        },
        weighingOperationSetting: {
          weighingStartWeight: 200,
          slipNoStart: 0,
          documentNumbering: 1,
        },
        maintenanceDataUpload: {
          isEnabling: false,
          uploadInterval: 1,
        },
      });
      const newItem = await item.save();
      res.status(200).json(newItem);
    } catch (error) {
      res.status(500).json(error);
      logger.error(error);
    }
  } else {
    const result = await OperationSetting.find({});
    try {
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
      logger.error(error);
    }
  }
};

export const getSerialPorts = async (req, res) => {
  try {
    const ports = await serialport.list();
    res.status(200).json(ports);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const getADCount = async (req, res) => {
  try {
    const result = await ADCount.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const readADCountByDate = async (req, res) => {
  const fromDate = new Date(req.params.date);
  fromDate.setHours(0, 0, 0);
  const toDate = new Date(req.params.date);
  toDate.setHours(23, 59, 59);
  const query = {
    createdAt: {
      $gte: fromDate,
      $lt: toDate,
    },
  };
  try {
    const result = await ADCount.find(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};
