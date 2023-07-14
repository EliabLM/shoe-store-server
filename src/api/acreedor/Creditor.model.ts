import { ICreditor } from 'interfaces';
import { Schema, model } from 'mongoose';

const creditorSchema = new Schema<ICreditor>({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    unique: true,
  },
  contact: {
    type: String,
    default: '',
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Creditor = model('Creditor', creditorSchema, 'acreedores');
export default Creditor;
