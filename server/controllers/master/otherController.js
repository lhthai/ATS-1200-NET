import OtherMaster from '../../models/master/otherMaster';
import logger from '../../libs/logger';

export const create = async (req, res) => {
  const { code, name } = req.body;
  const temp = await OtherMaster.findOne({ code });
  if (temp) {
    res.status(500).json({ message: 'This code is already exists!' });
  } else {
    try {
      const other = new OtherMaster({
        code,
        name,
      });
      const newOther = await other.save();
      res.status(200).json(newOther);
    } catch (error) {
      res.status(500).json(error);
      logger.error(error);
    }
  }
};

export const getAll = async (req, res) => {
  try {
    const result = await OtherMaster.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const get = async (req, res) => {
  try {
    const result = await OtherMaster.find({ code: req.params.code });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const remove = async (req, res) => {
  try {
    const item = await OtherMaster.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const update = async (req, res) => {
  try {
    const item = req.body;
    delete item._id; // Delete _id from req.body because in Mongo 2.4, can not update _id field
    const result = await OtherMaster.findOneAndUpdate(
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
