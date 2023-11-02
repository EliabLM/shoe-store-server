import { Enum_purchase_status, IPurchase } from '../../interfaces';
import { Schema, model } from 'mongoose';

const purchaseSchema = new Schema<IPurchase>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El usuario es obligatorio'],
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: 'Supplier',
      required: [true, 'El proveedor es obligatorio'],
    },
    total: {
      type: Number,
      required: [true, 'El total es obligatorio'],
    },
    expiration_date: {
      type: String,
      required: [true, 'La fecha máxima de pago es obligatoria'],
    },
    registration_date: {
      type: String,
      required: [true, 'La fecha de registro es obligatoria'],
    },
    purchase_status: {
      type: String,
      enum: Enum_purchase_status,
      default: Enum_purchase_status.PENDIENTE,
    },
  },
  { timestamps: true }
);

const Purchase = model('Purchase', purchaseSchema, 'purchases');
export default Purchase;
