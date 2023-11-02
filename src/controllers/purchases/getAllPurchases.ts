import { NextFunction, Request, Response } from 'express';

// Model
import Purchase from '@models/purchases/Purchase.model';

// Interfaces
import { IResponse } from '../../interfaces';
import { Purchase_status } from '../../types/types';

interface IPurchaseRes {
  _id: string;
  user: string;
  supplier: string;
  total: number;
  purchase_status: Purchase_status;
  registration_date: string;
  expiration_date: string;
  createdAt: string;
  updatedAt: string;
}

export const getAllPurchases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const purchases: IPurchaseRes[] = await Purchase.find()
      .populate({ path: 'user', select: '-createdAt -updatedAt' })
      .populate({ path: 'supplier', select: '-createdAt -updatedAt' });

    const allPurchases = purchases.map((purchase) => ({
      id: purchase._id,
      user: purchase.user,
      supplier: purchase.supplier,
      total: purchase.total,
      purchase_status: purchase.purchase_status,
      expiration_date: purchase.expiration_date,
      registration_date: purchase.registration_date,
      createdAt: purchase.createdAt,
      updatedAt: purchase.updatedAt,
    }));

    const response: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: allPurchases,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
