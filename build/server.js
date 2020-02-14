"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _compression = _interopRequireDefault(require("compression"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _socket = _interopRequireDefault(require("socket.io"));

var _serialPort = require("./libs/serialPort");

var _apiRoutes = _interopRequireDefault(require("./routes/apiRoutes"));

var _settingRoutes = _interopRequireDefault(require("./routes/settingRoutes"));

var _sockets = _interopRequireDefault(require("./libs/sockets"));

var _printer = require("./libs/printer");

var _logger = _interopRequireDefault(require("./libs/logger"));

_dotenv["default"].config();

var app = (0, _express["default"])(); // Config middlewares

app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _compression["default"])()); // Define APIs and app routes

app.use('/', _apiRoutes["default"]);
app.use('/setting', _settingRoutes["default"]); // Define folder to build and run React app

app.use(_express["default"]["static"](_path["default"].join(__dirname, '../../client/build')));
app.get('*', function (req, res) {
  res.sendFile(_path["default"].join(__dirname, '../../client/build/index.html'));
}); // Connect database MongoDB

_mongoose["default"].Promise = global.Promise;

_mongoose["default"].connect(process.env.MONGO_URI, {
  useMongoClient: true
}); // Start server and socket IO


var server = app.listen(process.env.PORT, function () {
  return _logger["default"].info("App started on port ".concat(process.env.PORT));
});

var io = _socket["default"].listen(server);

(0, _sockets["default"])(io);
(0, _serialPort.handleIndicator)(io);
(0, _printer.checkPrinterStatus)(io);