import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Purchase from '@models/purchases/Purchase.model';
import Supplier from '@models/supplier/Supplier.model';

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

export const getPurchasesBySupplier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { supplier_id } = req.query;

    const supplier = await Supplier.findById(supplier_id);
    if (!supplier) throw boom.notFound('No existe el proveedor');

    const purchases: IPurchaseRes[] = await Purchase.find({
      supplier: supplier_id,
    }).populate({ path: 'user', select: '-createdAt -updatedAt' });

    const selectedPurchases = purchases.map((purchase) => ({
      id: purchase._id,
      user: purchase.user,
      supplier: purchase.supplier,
      total: purchase.total,
      registration_date: purchase.registration_date,
      expiration_date: purchase.expiration_date,
      createdAt: purchase.createdAt,
      updatedAt: purchase.updatedAt,
    }));

    const response: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: selectedPurchases,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
