import { exec } from 'child_process';
import downloadLatestVersion from './aws';
import logger from './logger';

const updateApplication = socket => {
  downloadLatestVersion(() => {
    exec(
      'unzip -o /var/www/Latest.zip -d /var/www/ats && cd /var/www/ats/server && npm install',
      error => {
        if (error) {
          socket.emit('updateError');
          logger.error(error);
        } else {
          socket.emit('updateComplete');
          logger.info('Update successfully');
        }
      },
    );
  });
};

export default updateApplication;
