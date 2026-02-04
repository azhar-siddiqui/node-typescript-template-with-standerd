import { NextFunction, Request, Response } from 'express';

// Custom error shape (optional but recommended)
interface AppErrorDetails {
  [key: string]: any;
}

// Base custom error class
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: AppErrorDetails;

  constructor(
    message: string,
    statusCode: number,
    details?: AppErrorDetails,
    isOperational = true
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;

    // Maintains proper stack trace in Node.js
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error middleware (Express style)
export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): Response | void => {
  if (error instanceof AppError) {
    console.log(`Error ${req.method} ${req.url} - ${error.message}`);

    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      ...(error.details && { details: error.details }),
    });
  }

  // Handle unexpected / untyped errors
  console.error(
    `Unhandled error ${req.method} ${req.url} - ${(error as Error).message || String(error)}`
  );

  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong, please try again',
  });
};

// ────────────────────────────────────────────────
//          Common specific error classes
// ────────────────────────────────────────────────

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Invalid request data', details?: AppErrorDetails) {
    super(message, 400, details, true);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden access') {
    super(message, 403);
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'Database error', details?: AppErrorDetails) {
    super(message, 500, details, true);
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Too many requests, please try again later') {
    super(message, 429);
  }
}
