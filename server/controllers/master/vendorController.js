import VendorMaster from '../../models/master/vendorMaster';
import logger from '../../libs/logger';

// CREATE NEW VENDOR
export const create = async (req, res) => {
  const { code, name } = req.body;
  const temp = await VendorMaster.findOne({ code });
  if (temp) {
    res.status(500).json({ message: 'This code is already exists!' });
  } else {
    try {
      const vendor = new VendorMaster({
        code,
        name,
      });
      const newVendor = await vendor.save();
      res.status(200).json(newVendor);
    } catch (error) {
      res.status(500).json(error);
      logger.error(error);
    }
  }
};

export const getAll = async (req, res) => {
  try {
    const result = await VendorMaster.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const get = async (req, res) => {
  try {
    const result = await VendorMaster.find({ code: req.params.code });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const remove = async (req, res) => {
  try {
    const vendor = await VendorMaster.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const update = async (req, res) => {
  try {
    const item = req.body;
    delete item._id; // Delete _id from req.body because in Mongo 2.4, can not update _id field
    const vendor = await VendorMaster.findOneAndUpdate(
      { _id: req.params.id },
      item,
      { new: true },
    );
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};
