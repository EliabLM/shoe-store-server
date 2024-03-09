import * as yup from 'yup';

const mongoId = yup.string().matches(/^[0-9a-fA-F]{24}$/, 'El id no es válido');
const name = yup
  .string()
  .min(3, 'El nombre debe tener mínimo 3 caracteres')
  .max(30, 'El nombre debe tener máximo 30 caracteres');
const description = yup
  .string()
  .typeError('La descripción debe ser una cadena de texto')
  .max(200, 'La descripción debe tener máximo 200 caracteres')
  .nullable();
const active = yup
  .boolean()
  .typeError('El estado debe ser un dato verdadero o falso');

export const createLocationSchema = yup.object().shape({
  name: name.required('El nombre del local es obligatorio'),
  description,
});

export const updateLocationSchema = yup.object().shape({
  id: mongoId.required('El id es obligatorio'),
  name: name.required('El nombre del local es obligatorio'),
  description,
  active: active.required('El estado es obligatorio'),
});

export const deleteLocationSchema = yup.object().shape({
  location_id: mongoId.required('El id del local es obligatorio'),
});

export const readLocationsSchema = yup.object().shape({
  active,
});
