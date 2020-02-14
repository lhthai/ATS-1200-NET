import DestinationMaster from '../../models/master/destinationMaster';
import logger from '../../libs/logger';

export const create = async (req, res) => {
  const { code, name } = req.body;
  const temp = await DestinationMaster.findOne({ code });
  if (temp) {
    res.status(500).json({ message: 'This code is already exists!' });
  } else {
    try {
      const destination = new DestinationMaster({
        code,
        name,
      });
      const newDestination = await destination.save();
      res.status(200).json(newDestination);
    } catch (error) {
      res.status(500).json(error);
      logger.error(error);
    }
  }
};

export const getAll = async (req, res) => {
  try {
    const result = await DestinationMaster.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const get = async (req, res) => {
  try {
    const result = await DestinationMaster.find({ code: req.params.code });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const remove = async (req, res) => {
  try {
    const dest = await DestinationMaster.findByIdAndRemove({
      _id: req.params.id,
    });
    res.status(200).json(dest);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export const update = async (req, res) => {
  try {
    const item = req.body;
    delete item._id; // Delete _id from req.body because in Mongo 2.4, can not update _id field
    const dest = await DestinationMaster.findOneAndUpdate(
      { _id: req.params.id },
      item,
      { new: true },
    );
    res.status(200).json(dest);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};
