import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    item1: {
      name: String,
      display: Boolean,
      require: Boolean,
    },
    item2: {
      name: String,
      display: Boolean,
      require: Boolean,
    },
    item3: {
      name: String,
      display: Boolean,
      require: Boolean,
    },
    item4: {
      name: String,
      display: Boolean,
      require: Boolean,
    },
    item5: {
      name: String,
      display: Boolean,
      require: Boolean,
    },
    item6: {
      name: String,
      display: Boolean,
      require: Boolean,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('ItemOperationSetting', schema);
