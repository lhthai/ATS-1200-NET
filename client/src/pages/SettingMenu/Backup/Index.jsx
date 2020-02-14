import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUSBDrives } from '../../../actions/setting/backupActions';

import socket from '../../../helpers/socket';
// import BackupAWS from './BackupAWS';
import BackupUSB from './BackupUSB';

const Backup = () => {
  const drives = useSelector(state => state.backup.payload);
  const dispatch = useDispatch();
  const [backupDestination, setBackupDestination] = useState('');
  const [isUSBLoading, setIsUSBLoading] = useState(false);
  // const [isAWSLoading, setIsAWSLoading] = useState(false);

  useEffect(() => {
    dispatch(getUSBDrives());
  }, [dispatch]);

  useEffect(() => {
    socket.on('backupComplete', () => {
      setIsUSBLoading(false);
      toast.success('Backup successfully!');
    });

    socket.on('backupError', () => {
      setIsUSBLoading(false);
      toast.error('Something went wrong! Please try again!');
    });

    // socket.on('uploadAWSDone', () => {
    //   setIsAWSLoading(false);
    //   toast.success('Uploading data to AWS successfully!');
    // });

    // socket.on('uploadAWSError', () => {
    //   setIsAWSLoading(false);
    //   toast.error('Something went wrong! Please try again!');
    // });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (backupDestination !== '') {
      setIsUSBLoading(true);
      socket.emit('startBackup', backupDestination);
    } else {
      toast.error('Please choose a USB drive!');
    }
  };

  // const handleUploadAWS = () => {
  //   setIsAWSLoading(true);
  //   socket.emit('startUploadAWS');
  // };

  return (
    <div>
      <BackupUSB
        handleSubmit={handleSubmit}
        backupDestination={backupDestination}
        setBackupDestination={setBackupDestination}
        drives={drives}
        isUSBLoading={isUSBLoading}
      />
      {/* <BackupAWS
        isAWSLoading={isAWSLoading}
        handleUploadAWS={handleUploadAWS}
      /> */}
    </div>
  );
};

export default Backup;
