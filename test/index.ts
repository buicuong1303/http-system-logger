import 'dotenv/config';
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
  logger.setContext('TestRoute');
  logger.info('Test route accessed');
  res.send('Test route is working!');
});

// Ignored route
app.get('/api/health', (req, res) => {
  console.log('eeeee')
  res.send('Health check route new');
});


app.get('/api/v1/files/video/:id', (req, res) => {
  console.log(process.env.IGNORED_ROUTES);
  res.send('Dynamic route');
});
// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  logger.info(`Test server is running on http://localhost:${PORT}`);
});
