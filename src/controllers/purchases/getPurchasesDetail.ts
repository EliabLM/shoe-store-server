import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Purchase from '@models/purchases/Purchase.model';
import PurchaseDetail from '@models/purchases_detail/PurchaseDetail.model';

// Interfaces
import { IResponse } from '../../interfaces';

interface IPurchaseDetailRes {
  _id: string;
  purchase: string;
  product: string;
  price: number;
  amount: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
}

export const getPurchasesDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { purchase_id } = req.query;

    const purchase = await Purchase.findById(purchase_id);
    if (!purchase) throw boom.notFound('No existe la compra');

    const purchasesDetail: IPurchaseDetailRes[] = await PurchaseDetail.find({
      purchase: purchase_id,
    })
      .populate({
        path: 'product',
        select: '-createdAt -updatedAt',
        populate: {
          path: 'brand',
          select: '-createdAt -updatedAt',
        },
      })
      .populate({
        path: 'product',
        select: '-createdAt -updatedAt',
        populate: {
          path: 'categories',
        },
      });

    const allPurchasesDetail = purchasesDetail.map((purchaseDetail) => ({
      id: purchaseDetail._id,
      sale: purchaseDetail.purchase,
      product: purchaseDetail.product,
      price: purchaseDetail.price,
      amount: purchaseDetail.amount,
      subtotal: purchaseDetail.subtotal,
      createdAt: purchaseDetail.createdAt,
      updatedAt: purchaseDetail.updatedAt,
    }));

    const response: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: allPurchasesDetail,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
