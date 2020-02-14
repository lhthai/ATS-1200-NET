import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    truckNumber: {
      type: String,
      required: true,
    },
    brand: String,
    brandCode: String,
    vendor: String,
    vendorCode: String,
    destination: String,
    destinationCode: String,
    other: String,
    otherCode: String,
    emptyWeight: Number,
    maximumWeight: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model('TruckMaster', schema);
