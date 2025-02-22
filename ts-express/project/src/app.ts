import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { morganMiddleware } from './utils/logger';
import { errorHandler } from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

// Routes
app.use('/api/auth', authRoutes);

// Error handling
app.use(errorHandler);

export default app;