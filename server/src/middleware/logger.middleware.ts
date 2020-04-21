import { NextFunction, Request } from "express";

function loggerMiddleware(request: Request, next: NextFunction): void {
  console.log(`${request.method} ${request.path}`);
  next();
}

export default loggerMiddleware;
