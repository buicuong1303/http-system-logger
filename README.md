# HTTP System Logger

A lightweight and configurable logging library for Node.js applications, built with `winston` and `morgan`.

## Features

- Console and file-based logging with daily rotation.
- HTTP request logging using `morgan`.
- Customizable log levels and formats.
- Supports structured JSON logs for better integration with log management systems.
- Ability to ignore logs from specific routes.

## Installation

Install the library and its dependencies:

```bash
npm install http-system-logger
```

## Usage

### Logger Class

The `Logger` class provides methods for logging messages at different levels (`info`, `error`, `warn`, `debug`).

#### Example:

```typescript
import { Logger } from 'http-system-logger';

const logger = new Logger('MyAppContext');

// Log an informational message
logger.info('This is an info message');

// Log an error with a stack trace
logger.error('An error occurred', 'Error stack trace');

// Log a warning
logger.warn('This is a warning');

// Log a debug message
logger.debug('Debugging details');
```

### HTTP Request Logging

The library includes a `httpLogger` middleware for logging HTTP requests in Express applications.

#### Example:

```typescript
import express from 'express';
import { httpLogger } from 'http-system-logger';

const app = express();

// Use the HTTP logger middleware
app.use(httpLogger);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### Ignoring Specific Routes

You can configure the logger to ignore specific routes by setting the `IGNORED_ROUTES` environment variable. Provide a comma-separated list of routes to ignore.

#### Example:

```bash
export IGNORED_ROUTES=/api/health,/api/skip
```

In this example, requests to `/api/health` and `/api/skip` will not be logged.

### Environment Variables

You can configure the logger using the following environment variables:

| Variable           | Default Value | Description                                      |
|--------------------|---------------|--------------------------------------------------|
| `LOG_DIR`          | `logs`        | Directory where log files are stored.           |
| `LOG_MAX_SIZE`     | `4m`          | Maximum size of a log file before rotation.     |
| `LOG_MAX_FILES`    | `7d`          | Maximum number of log files to retain.          |
| `LOG_FILE_NAME`    | `application` | Base name for log files.                        |
| `SERVICE_NAME`     | `logger`      | Default service name included in log metadata.  |
| `IGNORED_ROUTES`   | `/api/health` | Comma-separated list of routes to ignore.       |


