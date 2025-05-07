import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z, ZodError } from 'zod';

export function validateData(schema: z.ZodType<any, any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema
        .parseAsync(req.body)
        .then(() => next())
        .catch((error) => {
          if (error instanceof ZodError) {
            const errorMessages = error.errors.map((issue) => ({
              message: `${issue.path.join('.')}: ${issue.message}`,
            }));
            res
              .status(StatusCodes.BAD_REQUEST)
              .json({ error: 'Invalid data', details: errorMessages });
          } else {
            res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ error: 'Internal Server Error' });
          }
        });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  };
}

export function validateSession(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.session && req.session.userId) {
      next();
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({
        error: 'Unauthorized',
        message: 'User session not found'
      });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
}