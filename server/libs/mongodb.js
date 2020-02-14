import { exec } from 'child_process';
import fs from 'fs';

export const backupMongo = (path, socket) => {
  exec(`mongodump -d ats-1200 -o ${path}`, error => {
    if (error) {
      socket.emit('backupError');
    }
    socket.emit('backupComplete');
  });
};

export const restoreMongo = (data, socket) => {
  try {
    if (fs.existsSync(data.path)) {
      if (data.item.setting === false) {
        exec(
          `mongorestore -d ats-1200 --nsExclude 'ats-1200.*settings' ${data.path}`,
          error => {
            if (error) {
              socket.emit('restoreError');
            }
            socket.emit('restoreComplete');
          },
        );
      } else {
        exec(`mongorestore --drop -d ats-1200 ${data.path}`, error => {
          if (error) {
            socket.emit('restoreError');
          }
          socket.emit('restoreComplete');
        });
      }
    } else {
      socket.emit('dataNotFound');
    }
  } catch (err) {
    socket.emit('restoreError');
  }
};
