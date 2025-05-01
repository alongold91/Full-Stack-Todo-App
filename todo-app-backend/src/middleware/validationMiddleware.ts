import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z, ZodError } from 'zod';

// Update the parameter type to be more inclusive
export function validateData(schema: z.ZodType<any, any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Since you have async refinements, you should use parseAsync
      schema.parseAsync(req.body)
        .then(() => next())
        .catch((error) => {
          if (error instanceof ZodError) {
            const errorMessages = error.errors.map((issue: any) => ({
              message: issue.message
            }));
            res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
          } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
          }
        });
    } catch (error) {
      // This catch block handles synchronous errors that might occur before parseAsync
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  };
}