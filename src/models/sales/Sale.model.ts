import {
  Enum_Payment_methods,
  Enum_Sale_status,
  ISale,
} from '../../interfaces';
import { Schema, model } from 'mongoose';

const saleSchema = new Schema<ISale>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El usuario es obligatorio'],
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'El cliente es obligatorio'],
    },
    total: {
      type: Number,
      required: [true, 'El total es obligatorio'],
    },
    payment_method: {
      type: String,
      enum: Enum_Payment_methods,
      required: [true, 'El método de pago es obligatorio'],
    },
    sale_status: {
      type: String,
      enum: Enum_Sale_status,
      required: [true, 'El estado de la venta es obligatorio'],
    },
  },
  { timestamps: true }
);

const Sale = model('Sale', saleSchema, 'sales');
export default Sale;
