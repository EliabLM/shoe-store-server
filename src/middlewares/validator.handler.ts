import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import boom from '@hapi/boom';

export function validatorHandler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: Joi.ObjectSchema<any>,
  property: keyof Request
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      next(boom.badRequest(error));
    }

    next();
  };
}
