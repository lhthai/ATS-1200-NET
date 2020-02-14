import { createLogger, format, transports } from 'winston';
import path from 'path';

const formatTime = () => {
  const date = new Date();

  let hour = date.getHours();
  hour = (hour < 10 ? '0' : '') + hour;

  let min = date.getMinutes();
  min = (min < 10 ? '0' : '') + min;

  let sec = date.getSeconds();
  sec = (sec < 10 ? '0' : '') + sec;

  const year = date.getFullYear();

  let month = date.getMonth() + 1;
  month = (month < 10 ? '0' : '') + month;

  let day = date.getDate();
  day = (day < 10 ? '0' : '') + day;

  const millisecond = date.getMilliseconds();

  return `${day}-${month}-${year} ${hour}:${min}:${sec}.${millisecond}`;
};

const customFormat = format.printf(
  ({ level, message }) =>
    `[${formatTime()}] ${level.toLocaleUpperCase()} ${message}`,
);

const logger = createLogger({
  exitOnError: false,
  format: customFormat,
  colorize: true,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({}));
} else {
  logger.add(
    new transports.File({
      filename: path.resolve(__dirname, '../', 'storage/logs', 'output.log'),
      maxsize: 10240,
    }),
  );
}

export default logger;
