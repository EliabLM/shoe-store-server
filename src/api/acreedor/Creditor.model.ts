import { ICreditor } from 'interfaces';
import { Schema, model } from 'mongoose';

const creditorSchema = new Schema<ICreditor>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    contact: {
      type: String,
      required: [true, 'El teléfono de contacto es obligatorio'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Creditor = model('Creditor', creditorSchema, 'acreedores');
export default Creditor;
