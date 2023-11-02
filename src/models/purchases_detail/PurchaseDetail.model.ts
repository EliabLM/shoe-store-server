import { IPurchaseDetail } from '../../interfaces';
import { Schema, model } from 'mongoose';

const purchaseDetailSchema = new Schema<IPurchaseDetail>(
  {
    purchase: {
      type: Schema.Types.ObjectId,
      ref: 'Purchase',
      required: [true, 'El id de la compra es obligatorio'],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'El id del producto es obligatorio'],
    },
    price: {
      type: Number,
      required: [true, 'El precio de compra es obligatorio'],
    },
    amount: {
      type: Number,
      required: [true, 'La cantidad es obligatoria'],
    },
    subtotal: {
      type: Number,
      required: [true, 'El subtotal es obligatorio'],
    },
  },
  { timestamps: true }
);

const PurchaseDetail = model(
  'PurchaseDetail',
  purchaseDetailSchema,
  'purchases_detail'
);
export default PurchaseDetail;
