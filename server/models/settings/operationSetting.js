import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    indicatorSetting: {
      portName: {
        type: String,
        required: true,
      },
      baudRate: {
        type: Number,
        required: true,
      },
      parity: {
        type: String,
        required: true,
      },
      dataBits: {
        type: Number,
        required: true,
      },
      stopBits: {
        type: Number,
        required: true,
      },
    },
    slipPrinterSetting: {
      portName: {
        type: String,
        required: true,
      },
      baudRate: {
        type: Number,
        required: true,
      },
      parity: {
        type: String,
        required: true,
      },
      dataBits: {
        type: Number,
        required: true,
      },
      stopBits: {
        type: Number,
        required: true,
      },
    },
    weighingOperationSetting: {
      weighingStartWeight: {
        type: Number,
        required: true,
      },
      slipNoStart: {
        type: Number,
        required: true,
      },
      documentNumbering: {
        type: Number,
        required: true,
      },
    },
    maintenanceDataUpload: {
      isEnabling: Boolean,
      uploadInterval: Number,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('OperationSetting', schema);
