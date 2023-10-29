import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Sale from '@models/sales/Sale.model';
import SaleDetail from '@models/sales_detail/SaleDetail.model';
import User from '@models/users/User.model';
import Customer from '@models/customer/Customer.model';
import Product from '@models/products/Product.model';

// Interfaces
import { IResponse } from '../../interfaces';

interface ISaleDetail {
  product_id: string;
  price: number;
  amount: number;
  subtotal: number;
}

export const createSale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, customer, products, total, payment_method, sale_status } =
      req.body;

    const userExists = await User.findById(user);
    if (!userExists) throw boom.notFound('No existe el usuario');

    const customerExists = await Customer.findById(customer);
    if (!customerExists) throw boom.notFound('No existe el cliente');

    await Promise.all(
      products.map(async (saleDetail: ISaleDetail) => {
        const productExists = await Product.findById(
          saleDetail.product_id
        ).populate('brand');
        if (!productExists) throw boom.notFound('No existe el producto');

        if (productExists.stock !== undefined && productExists.stock <= 0)
          throw boom.badRequest(
            `El producto ${productExists.name} no tiene existencias en inventario`
          );
      })
    );

    const sale = new Sale({
      user,
      customer,
      total,
      payment_method,
      sale_status,
    });
    const storedSale = await sale.save();

    const saleDetailPromises = products.map((product: ISaleDetail) => {
      const saleDetail = new SaleDetail({
        sale: sale._id,
        amount: product.amount,
        price: product.price,
        product: product.product_id,
        subtotal: product.subtotal,
      });

      return saleDetail.save();
    });

    await Promise.all(saleDetailPromises);

    await Promise.all(
      products.map(async (saleDetail: ISaleDetail) => {
        const storedProduct = await Product.findById(saleDetail.product_id);
        if (storedProduct && storedProduct.stock !== undefined) {
          storedProduct.stock -= saleDetail.amount;
        }

        await storedProduct?.save();
      })
    );

    const response: IResponse = {
      statusCode: 201,
      message: 'Venta creada exitosamente',
      data: storedSale,
    };

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
