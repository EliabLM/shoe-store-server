import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Purchase from '@models/purchases/Purchase.model';
import PurchaseDetail from '@models/purchases_detail/PurchaseDetail.model';
import Product from '@models/products/Product.model';

// Interfaces
import { IResponse, Enum_purchase_status } from '../../interfaces';

export const cancelPurchase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { purchase_id } = req.query;

    const purchaseExists = await Purchase.findById(purchase_id);
    if (!purchaseExists) throw boom.notFound('No existe la compra');

    if (purchaseExists.purchase_status !== Enum_purchase_status.PENDIENTE)
      throw boom.badRequest(
        'Solo se pueden cancelar las compras en estado pendiente'
      );

    const purchasesDetailExists = await PurchaseDetail.find({
      purchase: purchase_id,
    });

    await Promise.all(
      purchasesDetailExists.map(async (purchaseDetail) => {
        const product = await Product.findById(purchaseDetail.product);
        if (product && product.stock !== undefined) {
          product.stock -= purchaseDetail.amount;
        }

        await product?.save();
      })
    );

    const canceledPurchase = await Purchase.findByIdAndUpdate(
      purchase_id,
      { purchase_status: Enum_purchase_status.CANCELADA },
      { new: true }
    );

    const response: IResponse = {
      statusCode: 200,
      message: 'Compra cancelada exitosamente',
      data: canceledPurchase,
    };

    return res.json(response);
  } catch (error) {
    next(error);
  }
};
