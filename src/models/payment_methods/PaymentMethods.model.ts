import { IPaymentMethods } from '../../interfaces';
import { Schema, model } from 'mongoose';

const paymentMethodSchema = new Schema<IPaymentMethods>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const PaymentMethod = model(
  'PaymentMethod',
  paymentMethodSchema,
  'payment_methods'
);
export default PaymentMethod;
