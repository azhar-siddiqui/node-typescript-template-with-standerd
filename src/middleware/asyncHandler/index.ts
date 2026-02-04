import { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * Wraps async route handlers to catch errors and pass them to Express error middleware
 * No need for try/catch in every controller
 */
export function asyncHandler<T = any>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
