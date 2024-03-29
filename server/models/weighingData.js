import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    slipNo: Number,
    numberingType: Number,
    truckNumber: String,
    brandCode: String,
    brand: String,
    vendorCode: String,
    vendor: String,
    destinationCode: String,
    destination: String,
    otherCode: String,
    other: String,
    emptyWeight: Number,
    emptyTime: String,
    grossWeight: Number,
    grossTime: String,
    netWeight: Number,
    correctionNet: Number,
    edited: Boolean,
  },
  { timestamps: true },
);

module.exports = mongoose.model('WeighingData', schema);
