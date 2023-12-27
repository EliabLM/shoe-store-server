import * as yup from 'yup';
import { Enum_Payment_methods, Enum_Sale_status } from '../../interfaces';

const mongoId = yup.string().matches(/^[0-9a-fA-F]{24}$/, 'El id no es válido');
const total = yup
  .number()
  .typeError('Debe ingresar un número')
  .min(10000, 'El valor mínimo es de $10.000');
const payment_method = yup
  .string()
  .oneOf(
    [
      Enum_Payment_methods.Banco_de_bogota,
      Enum_Payment_methods.Bancolombia,
      Enum_Payment_methods.Daviplata,
      Enum_Payment_methods.Davivienda,
      Enum_Payment_methods.Efectivo,
      Enum_Payment_methods.Nequi,
    ],
    'El método de pago no es válido'
  );
const registration_date = yup
  .string()
  .test(
    'es-formato-iso',
    'La fecha de registro debe tener formato ISO',
    (value) => {
      return /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z?)$/.test(
        value || ''
      );
    }
  );
const sale_status = yup
  .string()
  .oneOf(
    [
      Enum_Sale_status.CANCELADA,
      Enum_Sale_status.PAGADA,
      Enum_Sale_status.PENDIENTE,
    ],
    'El estado no es válido'
  );

const product = yup.object().shape({
  product_id: yup
    .string()
    .matches(/^[0-9a-fA-F]{24}$/, 'El id no es válido')
    .required('El id del producto es obligatorio'),
  price: yup
    .number()
    .typeError('El precio debe ser un número')
    .positive('El precio debe ser un número positivo')
    .required('El precio es obligatorio'),
  amount: yup
    .number()
    .typeError('La cantidad debe ser un número')
    .positive('La cantidad debe ser un número positivo')
    .min(1, 'La cantidad mínima es 1')
    .required('La cantidad es obligatoria'),
  subtotal: yup
    .number()
    .typeError('El subtotal debe ser un número')
    .positive('El subtotal debe ser un número positivo')
    .required('El subtotal es obligatorio'),
});
const products = yup.array().of(product);

export const createSaleSchema = yup.object().shape({
  user: mongoId.required('El id del usuario es obligatorio'),
  sale_location: mongoId.required('El id del local es obligatorio'),
  total: total.required('El total es obligatorio'),
  products: products.min(1, 'Se debe incluir al menos un producto en la venta'),
  payment_method: payment_method.required('El método de pago es obligatorio'),
  registration_date: registration_date.required(
    'La fecha de registro es obligatoria'
  ),
  sale_status: sale_status.required('El estado es obligatorio'),
});

export const updateSaleSchema = yup.object().shape({
  id: mongoId.required('El id de la venta es obligatorio'),
  user: mongoId.required('El id del usuario es obligatorio'),
  sale_location: mongoId.required('El id del local es obligatorio'),
  total: total.required('El total es obligatorio'),
  payment_method: payment_method.required('El método de pago es obligatorio'),
  registration_date: registration_date.required(
    'La fecha de registro es obligatoria'
  ),
  sale_status: sale_status.required('El estado es obligatorio'),
});

export const getSalesByUserSchema = yup.object().shape({
  user_id: mongoId.required('El id del usuario es obligatorio'),
});

export const getSalesByCustomerSchema = yup.object().shape({
  customer_id: mongoId.required('El id del cliente es obligatorio'),
});

export const cancelSaleSchema = yup.object().shape({
  sale_id: mongoId.required('El id de la venta es obligatorio'),
});
