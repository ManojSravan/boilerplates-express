import winston from 'winston';
import { config } from '../config';

const formats = [
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
];

if (config.nodeEnv !== 'production') {
  formats.push(winston.format.colorize());
}

export const logger = winston.createLogger({
  level: config.nodeEnv === 'production' ? 'info' : 'debug',
  format: winston.format.combine(...formats),
  transports: [new winston.transports.Console()],
});