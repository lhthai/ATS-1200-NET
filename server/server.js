import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import compression from 'compression';
import dotenv from 'dotenv';
import path from 'path';
import socketIO from 'socket.io';
import { handleIndicator } from './libs/serialPort';
import apiRoutes from './routes/apiRoutes';
import settingRoutes from './routes/settingRoutes';
import sockets from './libs/sockets';
import { checkPrinterStatus } from './libs/printer';
import logger from './libs/logger';

dotenv.config();

const app = express();

// Config middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

// Define APIs and app routes
app.use('/', apiRoutes);
app.use('/setting', settingRoutes);

// Define folder to build and run React app
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Connect database MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true });

// Start server and socket IO
const server = app.listen(process.env.PORT || 8000, () =>
  logger.info(`App started on port ${process.env.PORT}`),
);
const io = socketIO.listen(server);

sockets(io);
handleIndicator(io);
checkPrinterStatus(io);
