import * as yup from 'yup';

const mongoId = yup.string().matches(/^[0-9a-fA-F]{24}$/, 'El id no es válido');
const name = yup
  .string()
  .min(3, 'El nombre debe tener mínimo 3 caracteres')
  .max(30, 'El nombres debe tener máximo 30 caracteres');
const contact = yup
  .string()
  .max(20, 'El número de contacto debe tener máximo 20 caracteres');
const email = yup
  .string()
  .email('Debe ingresar un correo electrónico válido')
  .min(5, 'El correo electrónico debe tener mínimo 5 caracteres');
const active = yup
  .boolean()
  .typeError('El estado debe ser un valor verdadero o falso');
const code = yup
  .string()
  .matches(
    /^[A-Z0-9]{6}$/,
    'El código debe tener exactamente 6 caracteres, compuestos por letras mayúsculas y números'
  );

export const createCustomerSchema = yup.object().shape({
  name: name.required('El nombre del cliente es obligatorio'),
  code: code.required('El código del cliente es obligatorio'),
  contact,
  email,
});

export const updateCustomerSchema = yup.object().shape({
  id: mongoId.required('El id del cliente es obligatorio'),
  name: name.required('El nombre del cliente es obligatorio'),
  code: code.required('El código del cliente es obligatorio'),
  active: active.required('El estado es obligatorio'),
  contact,
  email,
});

export const updateCustomerStateSchema = yup.object().shape({
  customer_id: mongoId.required('El id del cliente es obligatorio'),
  active: active.required('El estado es obligatorio'),
});

export const deleteCustomerSchema = yup.object().shape({
  customer_id: mongoId.required('El id del cliente es obligatorio'),
});

export const readCustomersSchema = yup.object().shape({
  active,
});
