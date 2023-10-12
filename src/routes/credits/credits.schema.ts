import * as Yup from 'yup';

const createCreditSchema = Yup.object().shape({
  creditor: Yup.string()
    .required('El acreedor es obligatorio')
    .typeError('El acreedor debe ser una cadena de texto'),
  initialValue: Yup.number()
    .required('El valor inicial es obligatorio')
    .typeError('El valor inicial debe ser un número')
    .min(1000, 'El valor mínimo es 1000'),
  creationDate: Yup.string()
    .required('La fecha de creación es obligatoria')
    .typeError('La fecha de creación debe ser una cadena de texto'),
  interestRate: Yup.string()
    .required('La tasa de interés es obligatoria')
    .typeError('La tasa de interés debe ser una cadena de texto'),
});

const updateCreditSchema = Yup.object().shape({
  creditor: Yup.string()
    .required('El acreedor es obligatorio')
    .typeError('El acreedor debe ser una cadena de texto'),
  initialValue: Yup.number()
    .required('El valor inicial es obligatorio')
    .typeError('El valor inicial debe ser un número')
    .min(1000, 'El valor mínimo es 1000'),
  creationDate: Yup.string()
    .required('La fecha de creación es obligatoria')
    .typeError('La fecha de creación debe ser una cadena de texto'),
  interestRate: Yup.string()
    .required('La tasa de interés es obligatoria')
    .typeError('La tasa de interés debe ser una cadena de texto'),
  active: Yup.boolean().required(),
  id: Yup.string()
    .required('El id es obligatorio')
    .typeError('El id debe ser una cadena de texto'),
});

export { createCreditSchema, updateCreditSchema };
