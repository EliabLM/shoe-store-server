import { Schema, model } from 'mongoose';
import { ISupplier } from '../../interfaces';

const supplierSchema = new Schema<ISupplier>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      unique: true,
      lowercase: true,
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

const Supplier = model('Supplier', supplierSchema, 'suppliers');
export default Supplier;
