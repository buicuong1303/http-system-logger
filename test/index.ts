import express from 'express';
import { httpLogger, Logger } from '../src';

const app = express();
const logger = new Logger('TestApp');

// Middleware to parse JSON requests
app.use(express.json());

// Use the HTTP logger middleware
app.use(httpLogger);

// Test route
app.get('/api/test', (req, res) => {
  logger.info('Test route accessed');
  res.send('Test route is working!');
});

// Ignored route
app.get('/api/health', (req, res) => {
  res.send('Health check route');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`Test server is running on http://localhost:${PORT}`);
});
