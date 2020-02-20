"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backupToAWS = exports.downloadLatestVersion = void 0;

var fs = _interopRequireWildcard(require("fs"));

var AWS = _interopRequireWildcard(require("aws-sdk"));

var _child_process = require("child_process");

var _path = _interopRequireDefault(require("path"));

var _logger = _interopRequireDefault(require("./logger"));

var s3bucket = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var uploadFile = function uploadFile(folder, socket) {
  var files = fs.readdirSync(folder);
  s3bucket.createBucket(function () {
    files.map(function (file) {
      var params = {
        Bucket: "".concat(process.env.BUCKET_NAME, "/Backup/").concat(process.env.CUSTOMER_ID),
        Key: file,
        Body: fs.createReadStream("".concat(folder, "/").concat(file))
      };
      return s3bucket.upload(params, function (err) {
        if (err) {
          socket.emit('uploadAWSError');
        }
      });
    });
  });
  socket.emit('uploadAWSDone');
};

var downloadLatestVersion = function downloadLatestVersion(callback) {
  var dir = '/var/www';
  var params = {
    Bucket: process.env.BUCKET_NAME,
    Key: 'Versions/Latest.zip'
  };
  s3bucket.getObject(params, function (err, data) {
    if (err) _logger["default"].error(err);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFile("".concat(dir, "/Latest.zip"), data.Body, callback);
  });
};

exports.downloadLatestVersion = downloadLatestVersion;

var backupToAWS = function backupToAWS(socket) {
  var dir = _path["default"].join(__dirname, '../storage');

  (0, _child_process.exec)("mongodump -d ats-1200 -o \"".concat(dir, "/data\""), function (error) {
    if (error) {
      socket.emit('uploadAWSError');
    }

    uploadFile("".concat(dir, "/data/ats-1200"), socket);
  });
};

exports.backupToAWS = backupToAWS;