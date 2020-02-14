import WeighingData from '../models/weighingData';
import OperationSetting from '../models/settings/operationSetting';
import logger from '../libs/logger';

export const create = async (req, res) => {
  const weight = new WeighingData({
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
    edited: false,
  });
  try {
    const newWeight = await weight.save();
    res.status(200).json(newWeight);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

// Return max Slip No of today
export const getMaxSlipNo = async (req, res) => {
  const date = new Date().toISOString().slice(0, 10);
  try {
    const temp = await OperationSetting.find({});
    const slipNoStart = parseInt(
      temp[0].weighingOperationSetting.slipNoStart,
      10,
    );
    const documentNumbering = parseInt(
      temp[0].weighingOperationSetting.documentNumbering,
      10,
    );
    if (slipNoStart === 0) {
      const result = await WeighingData.find({
        updatedAt: {
          $gte: date,
          $lt: new Date(date).setDate(new Date(date).getDate() + 1),
        },
        numberingType: 0,
      })
        .sort({ slipNo: -1 })
        .limit(1);
      if (result.length > 0) {
        res.status(200).json(parseInt(result[0].slipNo, 10) + 1);
      } else {
        res.status(200).json(1);
      }
    } else if (slipNoStart === 1) {
      // Handle logic calc Specified Slip No
      const result = await WeighingData.find({
        updatedAt: {
          $gte: date,
          $lt: new Date(date).setDate(new Date(date).getDate() + 1),
        },
        numberingType: 1,
      })
        .sort({ slipNo: -1 })
        .limit(1);
      const slipNo = parseInt(result[0].slipNo, 10);

      if (result.length > 0) {
        if (slipNo < documentNumbering) {
          res.status(200).json(documentNumbering);
        } else {
          res.status(200).json(slipNo + 1);
        }
      } else {
        res.status(200).json(documentNumbering);
      }
    } else if (slipNoStart === 2) {
      // Handle logic calc Sequential Slip No
      const result = await WeighingData.find({ numberingType: 2 })
        .sort({ slipNo: -1 })
        .limit(1);
      const slipNo = parseInt(result[0].slipNo, 10);

      if (result.length > 0) {
        if (documentNumbering > slipNo) {
          res.status(200).json(documentNumbering);
        } else {
          res.status(200).json(slipNo + 1);
        }
      } else {
        res.status(200).json(documentNumbering);
      }
    }
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const getAll = async (req, res) => {
  try {
    const result = await WeighingData.find({ emptyWeight: { $gt: 0 } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const remove = async (req, res) => {
  try {
    const weight = await WeighingData.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json(weight);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const update = async (req, res) => {
  try {
    const item = req.body;
    delete item._id; // Delete _id from req.body because in Mongo 2.4, can not update _id field
    const weight = await WeighingData.findOneAndUpdate(
      { _id: req.params.id },
      item,
      { new: false },
    );
    res.status(200).json(weight);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const getStayingTrucks = async (req, res) => {
  try {
    const result = await WeighingData.find({ emptyWeight: null });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const getWeighingByDate = async (req, res) => {
  const date = new Date(req.params.date).toISOString().slice(0, 10);
  try {
    const result = await WeighingData.find({
      emptyWeight: { $gte: 0 },
      updatedAt: {
        $gte: date,
        $lt: new Date(date).setDate(new Date(date).getDate() + 1),
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const report = async (req, res) => {
  const { firstItem, secondItem, from, to } = req.params;
  const fromDate = new Date(from);
  fromDate.setHours(0, 0, 0);
  const toDate = new Date(to);
  toDate.setHours(23, 59, 59);

  // Querying 2 items at the same time
  const twoItems = [
    {
      $match: {
        emptyWeight: { $gte: 0 },
        updatedAt: {
          $gte: fromDate,
          $lte: toDate,
        },
      },
    },
    {
      $group: {
        _id: {
          firstItem: `$${firstItem}`,
          secondItem: `$${secondItem}`,
        },
        brandCode: { $first: '$brandCode' },
        vendorCode: { $first: '$vendorCode' },
        destinationCode: { $first: '$destinationCode' },
        otherCode: { $first: '$otherCode' },
        totalCount: { $sum: 1 },
        totalWeight: { $sum: '$correctionNet' },
      },
    },
    // { $sort: { "_id.firstItem": 1 } }
  ];

  // Querying 1 item
  const oneItem = [
    {
      $match: {
        emptyWeight: { $gte: 0 },
        updatedAt: {
          $gte: fromDate,
          $lte: toDate,
        },
      },
    },
    {
      $group: {
        _id: `$${firstItem}`,
        brandCode: { $first: '$brandCode' },
        vendorCode: { $first: '$vendorCode' },
        destinationCode: { $first: '$destinationCode' },
        otherCode: { $first: '$otherCode' },
        totalCount: { $sum: 1 },
        totalWeight: { $sum: '$correctionNet' },
      },
    },
    // { $sort: { _id: 1 } }
  ];

  try {
    let result;
    if (secondItem === undefined) {
      result = await WeighingData.aggregate(oneItem);
    } else {
      result = await WeighingData.aggregate(twoItems);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};
