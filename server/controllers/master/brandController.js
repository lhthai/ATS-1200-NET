import BrandMaster from '../../models/master/brandMaster';
import logger from '../../libs/logger';

export const create = async (req, res) => {
  const { code, name } = req.body;
  const temp = await BrandMaster.findOne({ code });
  if (temp) {
    res.status(500).json({ message: 'This code is already exists!' });
  } else {
    try {
      const brand = new BrandMaster({
        code,
        name,
      });
      const newBrand = await brand.save();
      res.status(200).json(newBrand);
    } catch (error) {
      res.status(500).json(error);
      logger.error(error);
    }
  }
};

export const getAll = async (req, res) => {
  try {
    const brands = await BrandMaster.find({});
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const get = async (req, res) => {
  try {
    const brand = await BrandMaster.find({ code: req.params.code });
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const remove = async (req, res) => {
  try {
    const brand = await BrandMaster.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const update = async (req, res) => {
  try {
    const item = req.body;
    delete item._id; // Delete _id from req.body because in Mongo 2.4, can not update _id field
    const brand = await BrandMaster.findOneAndUpdate(
      { _id: req.params.id },
      item,
      { new: true },
    );
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};
