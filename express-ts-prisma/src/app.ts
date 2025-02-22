import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error.middleware';
import { userRouter } from './routes/user.routes';
import { authRouter } from './routes/auth.routes';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

// Error handling
app.use(errorHandler);

export default app;