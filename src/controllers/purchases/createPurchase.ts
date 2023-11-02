import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Purchases from '@models/purchases/Purchase.model';
import PurchaseDetail from '@models/purchases_detail/PurchaseDetail.model';
import User from '@models/users/User.model';
import Supplier from '@models/supplier/Supplier.model';
import Product from '@models/products/Product.model';

// Interfaces
import { IResponse } from '../../interfaces';

interface IPurchaseDetail {
  product_id: string;
  price: number;
  amount: number;
  subtotal: number;
}

export const createPurchase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      user,
      supplier,
      detail_list,
      total,
      expiration_date,
      registration_date,
    } = req.body;

    const userExists = await User.findById(user);
    if (!userExists) throw boom.notFound('No existe el usuario');

    const supplierExists = await Supplier.findById(supplier);
    if (!supplierExists) throw boom.notFound('No existe el proveedor');

    await Promise.all(
      detail_list.map(async (purchaseDetail: IPurchaseDetail) => {
        const productExists = await Product.findById(
          purchaseDetail.product_id
        ).populate('brand');
        if (!productExists) throw boom.notFound('No existe el producto');
      })
    );

    const purchase = new Purchases({
      user,
      supplier,
      total,
      expiration_date,
      registration_date,
    });
    const storedPurchase = await purchase.save();

    const purchaseDetailPromises = detail_list.map(
      (detail: IPurchaseDetail) => {
        const purchaseDetail = new PurchaseDetail({
          purchase: purchase._id,
          amount: detail.amount,
          price: detail.price,
          product: detail.product_id,
          subtotal: detail.subtotal,
        });

        return purchaseDetail.save();
      }
    );

    await Promise.all(purchaseDetailPromises);

    await Promise.all(
      detail_list.map(async (detail: IPurchaseDetail) => {
        const storedProduct = await Product.findById(detail.product_id);
        if (storedProduct && storedProduct.stock !== undefined) {
          storedProduct.stock += detail.amount;
        }

        await storedProduct?.save();
      })
    );

    const response: IResponse = {
      statusCode: 201,
      message: 'Compra creada exitosamente',
      data: storedPurchase,
    };

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
