import * as yup from 'yup';

const name = yup
  .string()
  .min(3, 'El nombre debe tener mínimo 3 caracteres')
  .max(30, 'El nombre debe tener máximo 30 caracteres');
const description = yup
  .string()
  .min(3, 'La descripción debe tener mínimo 3 caracteres')
  .max(200, 'La descripción debe tener máximo 200 caracteres');
const active = yup.boolean();
const id = yup.string();

export const createLocationSchema = yup.object().shape({
  name: name.required('El nombre del local es obligatorio'),
  description,
});

export const updateLocationSchema = yup.object().shape({
  id: id.required('El id es obligatorio'),
  name: name.required('El nombre del local es obligatorio'),
  description,
  active: active.required('El estado es obligatorio'),
});
