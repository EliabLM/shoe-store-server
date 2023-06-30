import Joi from 'joi';

const name = Joi.string().min(3).max(20);
const contact = Joi.string();

export const createCreditorSchema = Joi.object({
  name: name.required().messages({
    'string.base': 'El nombre debe ser una cadena de texto',
    'string.empty': 'El nombre es obligatorio',
    'string.min': 'El nombre debe tener al menos {#limit} caracteres',
    'string.max': 'El nombre no puede tener más de {#limit} caracteres',
  }),
  contact: contact.messages({
    'string.base': 'El número de contacto debe ser una cadena de texto',
  }),
});
