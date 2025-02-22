const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { notFound, errorHandler } = require('./middlewares/error.middleware');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

// Routes
app.use('/api/users', userRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;