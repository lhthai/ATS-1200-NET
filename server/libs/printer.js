import escpos from 'escpos';
import logger from './logger';

export const checkPrinterStatus = io => {
  setInterval(() => {
    try {
      const device = new escpos.USB();
      const options = { encoding: 'EUC-JP' };
      const printer = new escpos.Printer(device, options);
      device.open(() => {
        printer.close();
        io.sockets.emit('printerReady', true);
        logger.info('Printer connected');
      });
    } catch (error) {
      io.sockets.emit('printerReady', false);
      //  logger.error(error.toString())
    }
  }, 1000);
};

export const printVoucher = data => {
  const device = new escpos.USB();
  const options = { encoding: 'EUC-JP' };
  const printer = new escpos.Printer(device, options);
  try {
    if (data.updatedAt !== undefined) {
      device.open(() => {
        printer
          .font('b')
          .size(2, 2)
          .align('ct')
          .text('ATS-1200-NET')
          .control('LF')
          .size(1, 1)
          .table([
            data.updatedAt.slice(0, 19),
            `No: ${data.slipNo} ${data.edited ? '   (Edited)' : ''}`,
          ])
          .control('LF')
          .table(['Truck No:', data.carNumber])
          .table(['Brand:', data.brandCode])
          .table(['Vendor:', data.vendorCode])
          .table(['Destination:', data.destinationCode])
          .table(['Other:', data.otherCode])
          .table(['Empty Weight:', data.emptyWeight])
          .table(['Gross Weight:', data.grossWeight])
          .table(['Net Weight:', data.correctionNet])
          .control('LF')
          .align('ct')
          .text('https://www.tanaka-scale.co.jp/')
          .println('\n') // println to avoid missing content when cut paper. **Do not delete this command**
          .print('\x1b'.concat('\x69')) // command to cut the paper
          .close();
      });
    } else {
      logger.error('Print error');
    }
  } catch (error) {
    logger.error('Print error');
  }
};
