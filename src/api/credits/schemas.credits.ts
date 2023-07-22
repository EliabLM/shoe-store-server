import Joi from 'joi';

const creditor = Joi.string();
const initialValue = Joi.number().min(1000);
const creationDate = Joi.string();
const interestRate = Joi.string();

export const createCreditSchema = Joi.object({
  creditor: creditor.required().messages({
    'string.base': 'El acreedor debe ser una cadena de texto',
    'string.empty': 'El acreedor es obligatorio',
  }),
  initialValue: initialValue.required().messages({
    'number.base': 'El valor inicial debe ser un número',
    'number.empty': 'El valor inicial es obligatorio',
    'number.min': 'El valor mínimo es 1000',
  }),
  creationDate: creationDate.required().messages({
    'string.base': 'La fecha de creación debe ser una cadena de texto',
    'string.empty': 'La fecha de creación es obligatoria',
  }),
  interestRate: interestRate.required().messages({
    'string.base': 'La tasa de interés debe ser una cadena de texto',
    'string.empty': 'La tasa de interés es obligatoria',
  }),
});
