import { exec } from 'child_process';

export const restartServer = () => {
  exec('pm2 reload ATS');
};

export default restartServer;
