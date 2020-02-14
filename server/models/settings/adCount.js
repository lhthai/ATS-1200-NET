import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    data: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('ADCount', schema);
