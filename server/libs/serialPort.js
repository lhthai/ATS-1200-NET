import serialport from 'serialport';
import Readline from '@serialport/parser-readline';

import OperationSetting from '../models/settings/operationSetting';
import ADCount from '../models/settings/adCount';
// import logger from './logger';

const parser = new Readline();

const readAdCount = (comPort, item) => {
  const { isEnabling } = item[0].maintenanceDataUpload;
  const { uploadInterval } = item[0].maintenanceDataUpload;

  if (isEnabling) {
    setInterval(() => {
      comPort.write('A0\r\n');
    }, uploadInterval * 60 * 1000);
  }

  parser.on('data', async data => {
    if (data.toString().indexOf('A0') > -1) {
      const adCount = new ADCount({
        data: data.toString().slice(6, 14),
      });
      await adCount.save();
    }
  });
};

const readWeight = (comPort, io) => {
  // Write command to indicator every 200ms
  setInterval(() => {
    comPort.write('RW\r\n');
  }, 200);

  parser.on('data', data => {
    if (data.toString().indexOf('A0') === -1) {
      io.sockets.emit('readWeight', {
        weight: data
          .toString()
          .slice(7, 14)
          .replace(/^0+/, ''),
        flag: data.toString().slice(0, 2),
      });
    }
  });
};

export const handleIndicator = async io => {
  // Read indicator port configuration from database
  const item = await OperationSetting.find({});
  const port = item[0].indicatorSetting;

  // eslint-disable-next-line new-cap
  const comPort = new serialport(
    port.portName,
    {
      baudRate: port.baudRate,
      parser: new serialport.parsers.Readline('\r\n'),
      parity: port.parity,
      stopBits: port.stopBits,
      dataBits: port.dataBits,
      autoOpen: false,
    },
    error => {
      if (error) {
        io.sockets.emit('indicatorDisconnected');
        // logger.error(error.toString());
      }
    },
  );

  comPort.open(error => {
    if (error) {
      io.sockets.emit('indicatorDisconnected');
      // logger.error(error.toString());
    }

    // Parse data from Buffer to string
    comPort.pipe(parser);
    readAdCount(comPort, item);
    readWeight(comPort, io);
  });

  comPort.once('close', () => {
    io.sockets.emit('indicatorDisconnected');
    // logger.info('Indicator disconnected');
  });
};

export default handleIndicator;
