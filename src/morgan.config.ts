import morgan from 'morgan'
import logger from './winston.config'
import { Request, Response } from 'express'
import * as uuid from 'uuid'
const morganMiddleware = morgan(
  function (tokens: any, req: Request, res: Response) {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      content_length: tokens.res(req, res, 'content-length'),
      response_time: Number.parseFloat(tokens['response-time'](req, res)),
      http_version: tokens['http-version'](req, res),
      use_agent: tokens['user-agent'](req, res),
      request_body: req.body,
      id: tokens.req(req, res, 'x-request-id') || uuid.v4(),
    })
  },
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => {
        logger.http(message, { context: 'HttpContext' })
      },
    },
  },
)
export default morganMiddleware
