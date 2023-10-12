/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { Schema as YupSchema, ValidationError } from 'yup';
import boom from '@hapi/boom';

export function validatorHandler(
  schema: YupSchema<any>,
  property: keyof Request
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];

    try {
      await schema.validate(data, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        const errorMessage = error.inner.map((err) => err.message);
        next(boom.badRequest(errorMessage.join('. ')));
      } else {
        next(error);
      }
    }
  };
}
