import { restartServer } from './restartServer';
import { backupMongo, restoreMongo } from './mongodb';
import updateApplication from './update';
import { printVoucher } from './printer';
import backupToAWS from './aws';

const sockets = io => {
  io.on('connection', socket => {
    socket.on('restartServer', () => {
      restartServer();
    });

    socket.on('startBackup', data => {
      backupMongo(data, socket);
    });

    socket.on('startUploadAWS', () => {
      backupToAWS(socket);
    });

    socket.on('startRestore', data => {
      restoreMongo(data, socket);
    });

    socket.on('startUpdate', () => {
      updateApplication(socket);
    });

    socket.on('printVoucher', data => {
      printVoucher(data);
    });
  });
};

export default sockets;
