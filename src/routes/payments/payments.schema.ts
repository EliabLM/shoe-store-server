import * as Yup from 'yup';

const createPaymentSchema = Yup.object().shape({
  credit: Yup.string()
    .required('El crédito es obligatorio')
    .typeError('El crédito debe ser una cadena de texto'),
  amount: Yup.number()
    .required('El pago es obligatorio')
    .typeError('El pago debe ser un número'),
  date: Yup.string()
    .required('La fecha es obligatoria')
    .typeError('La fecha debe ser una cadena de texto'),
});

export { createPaymentSchema };
