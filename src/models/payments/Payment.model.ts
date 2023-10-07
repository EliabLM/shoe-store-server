import { Schema, model } from 'mongoose';
import { IPayment } from '../../interfaces';

const paymentSchema = new Schema<IPayment>(
  {
    credit: {
      type: Schema.Types.ObjectId,
      ref: 'Credit',
    },
    date: {
      type: String,
      required: [true, 'La fecha de creación es obligatoria'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'El monto es obligatorio'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Payment = model('Payment', paymentSchema, 'payments');
export default Payment;
