import Boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import { IGenericError } from '../interfaces';

export function logError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('🚀 ~ error middleware:', error);

  next(error);
}

export function boomErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (Boom.isBoom(error)) {
    const { output } = error;
    const { statusCode, payload } = output;

    return res.status(statusCode).json(payload);
  }

  next(error);
}

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  const genericErrorRes: IGenericError = {
    statusCode: 500,
    message: error.message,
    error: error.name,
    stack: error.stack,
  };

  return res.status(500).json(genericErrorRes);
}
