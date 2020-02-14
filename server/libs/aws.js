import * as fs from 'fs';
import * as AWS from 'aws-sdk';
import { exec } from 'child_process';
import path from 'path';
import logger from './logger';

const s3bucket = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadFile = (folder, socket) => {
  const files = fs.readdirSync(folder);
  s3bucket.createBucket(() => {
    files.map(file => {
      const params = {
        Bucket: `${process.env.BUCKET_NAME}/Backup/${process.env.CUSTOMER_ID}`,
        Key: file,
        Body: fs.createReadStream(`${folder}/${file}`),
      };
      return s3bucket.upload(params, err => {
        if (err) {
          socket.emit('uploadAWSError');
        }
      });
    });
  });
  socket.emit('uploadAWSDone');
};

export const downloadLatestVersion = callback => {
  const dir = '/var/www';
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: 'Versions/Latest.zip',
  };
  s3bucket.getObject(params, (err, data) => {
    if (err) logger.error(err);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFile(`${dir}/Latest.zip`, data.Body, callback);
  });
};

export const backupToAWS = socket => {
  const dir = path.join(__dirname, '../storage');

  exec(`mongodump -d ats-1200 -o "${dir}/data"`, error => {
    if (error) {
      socket.emit('uploadAWSError');
    }
    uploadFile(`${dir}/data/ats-1200`, socket);
  });
};
