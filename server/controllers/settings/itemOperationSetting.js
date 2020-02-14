import ItemOperationSetting from '../../models/settings/itemOperationSetting';
import logger from '../../libs/logger';

export const get = async (req, res) => {
  const count = await ItemOperationSetting.count({});
  if (count === 0) {
    try {
      const newItem = new ItemOperationSetting({
        item1: {
          name: 'Truck Number',
          display: true,
          require: false,
        },
        item2: {
          name: 'Brand',
          display: true,
          require: false,
        },
        item3: {
          name: 'Vendor',
          display: true,
          require: false,
        },
        item4: {
          name: 'Destination',
          display: true,
          require: false,
        },
        item5: {
          name: 'Other',
          display: true,
          require: false,
        },
        item6: {
          name: 'Other 2',
          display: false,
          require: false,
        },
      });
      const result = await newItem.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
      logger.error(error);
    }
  } else {
    try {
      const result = await ItemOperationSetting.find({});
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
      logger.error(error);
    }
  }
};

export const update = async (req, res) => {
  try {
    const item = req.body;
    delete item._id; // Delete _id from req.body because in Mongo 2.4, can not update _id field
    const result = await ItemOperationSetting.findOneAndUpdate(
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
