import * as yup from 'yup';

const name = yup.string().min(3, 'Debe ingresar mínimo 3 caracteres');
const contact = yup.string().max(20, 'Debe ingresar máximo 20 caracteres');

export const createCreditorSchema = yup.object().shape({
  name: name.required('El nombre del acreedor es obligatorio'),
  contact: contact.required('El número de contacto es obligatorio'),
});
