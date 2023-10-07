// import * as yup from 'yup';
import Joi from 'joi';

// const credit = yup.string();
// const amount = yup.number();
// const date = yup.string();

// export const createPaymentSchema = yup.object({
//   credit: credit.required('El crédito es obligatorio'),
//   amount: amount.required('El pago es obligatorio'),
//   date: date.required('La fecha es obligatoria'),
// });

const credit = Joi.string();
const amount = Joi.number();
const date = Joi.string();

export const createPaymentSchema = Joi.object({
  credit: credit.required().messages({
    'string.base': 'El crédito debe ser una cadena de texto',
    'string.empty': 'El crédito es obligatorio',
  }),
  amount: amount.required().messages({
    'number.base': 'El pago debe ser un número',
    'number.empty': 'El pago es obligatorio',
  }),
  date: date.required().messages({
    'string.base': 'La fecha debe ser una cadena de texto',
    'string.empty': 'La fecha es obligatoria',
  }),
});
