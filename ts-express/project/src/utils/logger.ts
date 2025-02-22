import morgan from 'morgan';
import { config } from '../config/config';

const logger = {
  info: (...args: any[]) => {
    console.log(...args);
  },
  error: (...args: any[]) => {
    console.error(...args);
  },
};

export const morganMiddleware = morgan(
  config.nodeEnv === 'development' ? 'dev' : 'combined'
);

export default logger;