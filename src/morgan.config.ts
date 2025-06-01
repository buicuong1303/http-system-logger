import morgan from "morgan";
import { getLogger } from "./winston.config";
import { Request, Response } from "express";
import * as uuid from "uuid";

const morganMiddleware = morgan(
  function (tokens: any, req: Request, res: Response) {
    const ignoredRoutesRaw = (process.env.IGNORED_ROUTES || "/api/health")
      .split(",")
      .map((route) => route.trim());

    const ignoredRoutesExact = ignoredRoutesRaw.filter(
      (route) => !route.includes("*")
    );
    const ignoredRoutesRegex = ignoredRoutesRaw
      .filter((route) => route.includes("*"))
      .map((route) => new RegExp("^" + route.replace(/\*/g, ".*") + "$"));

    function isIgnoredRoute(path: string): boolean {
      if (ignoredRoutesExact.includes(path)) return true;
      return ignoredRoutesRegex.some((regex) => regex.test(path));
    }
    if (isIgnoredRoute(req.path)) {
      return null; // Skip logging for ignored routes
    }
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      content_length: tokens.res(req, res, "content-length"),
      response_time: Number.parseFloat(tokens["response-time"](req, res)),
      http_version: tokens["http-version"](req, res),
      user_agent: tokens["user-agent"](req, res),
      request_body: req.body,
      id: tokens.req(req, res, "x-request-id") || uuid.v4(),
    });
  },
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => {
        if (message) {
          getLogger().http(message, { context: "HttpContext" });
        }
      },
    },
  }
);
export default morganMiddleware;
