import TruckMaster from '../../models/master/truckMaster';
import logger from '../../libs/logger';

export const create = async (req, res) => {
  const truck = new TruckMaster({
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
    maximumWeight: req.body.maximumWeight,
  });
  try {
    const newTruck = await truck.save();
    res.status(200).json(newTruck);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const get = async (req, res) => {
  try {
    const result = await TruckMaster.find({
      truckNumber: req.params.truckNumber,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const getAll = async (req, res) => {
  try {
    const result = await TruckMaster.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const remove = async (req, res) => {
  try {
    const truck = await TruckMaster.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json(truck);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const update = async (req, res) => {
  try {
    const item = req.body;
    delete item._id; // Delete _id from req.body because in Mongo 2.4, can not update _id field
    const truck = await TruckMaster.findOneAndUpdate(
      { _id: req.params.id },
      item,
      { new: true },
    );
    res.status(200).json(truck);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};
