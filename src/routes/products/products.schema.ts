import * as yup from 'yup';

const mongoId = yup
  .string()
  .matches(/^[0-9a-fA-F]{24}$/, 'El id no es válido')
  .typeError('El id debe ser una cadena de texto');
const categories = yup
  .array()
  .of(mongoId)
  .min(1, 'El producto debe tener por lo menos una categoría');
const name = yup
  .string()
  .min(3, 'El nombres debe tener mínimo 3 caracteres')
  .max(30, 'El nombre debe tener máximo 30 caracteres');
const description = yup
  .string()
  .typeError('La descripción debe ser una cadena de texto')
  .max(200, 'La descripción debe tener máximo 200 caracteres')
  .nullable();
const price = yup
  .number()
  .positive('El precio solo acepta números positivos')
  .typeError('Debe ingresar un número')
  .min(10000, 'El valor mínimo es 10.000');
const stock = yup
  .number()
  .typeError('Debe ingresar un número')
  .positive('La cantidad debe ser mayor a 0');
const active = yup
  .boolean()
  .typeError('El estado debe ser un valor verdadero o falso');

export const createProductSchema = yup.object().shape({
  brand: mongoId.required('La marca es obligatoria'),
  categories: categories.required(
    'Las categorías son obligatorias, debe ingresar por lo menos una'
  ),
  name: name.required('El nombre del producto es obligatorio'),
  description,
  price: price.required('El precio es obligatorio'),
  stock,
});

export const updateProductSchema = yup.object().shape({
  id: mongoId.required('El id del producto es obligatorio'),
  brand: mongoId.required('La marca es obligatoria'),
  categories: categories.required(
    'Las categorías son obligatorias, debe ingresar por lo menos una'
  ),
  name: name.required('El nombre del producto es obligatorio'),
  description,
  price: price.required('El precio es obligatorio'),
  active: active.required('El estado es obligatorio'),
});

export const updateProductStateSchema = yup.object().shape({
  product_id: mongoId.required('El id del producto es obligatorio'),
  active: active.required('El estado es obligatorio'),
});

export const deleteProductSchema = yup.object().shape({
  product_id: mongoId.required('El id del producto es obligatorio'),
});

export const readProductsSchema = yup.object().shape({
  active,
});
