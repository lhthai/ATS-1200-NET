import * as drivelist from 'drivelist';
import logger from '../../libs/logger';

export const getUSBDrives = async (req, res) => {
  try {
    const drives = await drivelist.list();
    const result = [];
    drives.map(drive => {
      if (drive.isUSB) {
        result.push(drive);
      }
      return result;
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    logger.error(error);
  }
};

export default getUSBDrives;
