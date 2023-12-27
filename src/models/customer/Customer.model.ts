import { Schema, model } from 'mongoose';
import { ICustomer } from '../../interfaces';

const customerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      lowercase: true,
    },
    code: {
      type: String,
      required: [true, 'El código del cliente es obligatorio'],
      unique: true,
      trim: true,
      minlength: 6,
      maxlength: 6,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    contact: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Customer = model('Customer', customerSchema, 'customers');
export default Customer;
