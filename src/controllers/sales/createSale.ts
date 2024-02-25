import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Sale from '@models/sales/Sale.model';
import User from '@models/users/User.model';
import Customer from '@models/customer/Customer.model';
import Product from '@models/products/Product.model';
import Location from '@models/locations/Location.model';
import PaymentMethod from '@models/payment_methods/PaymentMethods.model';

// Interfaces
import { IResponse } from '../../interfaces';
import { SaleDetail } from './getAllSales';

export const createSale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      user,
      customer,
      sale_location,
      payment_method,
      sale_status,
      registration_date,
      sale_detail,
    } = req.body;

    const userExists = await User.findById(user.user_id);
    if (!userExists) throw boom.notFound('No existe el usuario');

    if (customer) {
      const customerExists = await Customer.findById(customer.customer_id);
      if (!customerExists) throw boom.notFound('No existe el cliente');
    }

    const locationExists = await Location.findById(
      sale_location.sale_location_id
    );
    if (!locationExists) throw boom.notFound('No existe el local ingresado');

    const paymentMethodExists = await PaymentMethod.findById(
      payment_method.payment_method_id
    );
    if (!paymentMethodExists)
      throw boom.notFound('No existe el método de pago ingresado');

    await Promise.all(
      sale_detail.map(async (saleDetail: SaleDetail) => {
        const productExists = await Product.findById(
          saleDetail.product.product_mongo_id
        ).populate('brand');
        if (!productExists)
          throw boom.notFound(
            `No existe el producto '${saleDetail.product.brand.name} ${saleDetail.product.name}' en sistema`
          );

        if (productExists.stock !== undefined && productExists.stock <= 0)
          throw boom.badRequest(
            `El producto '${saleDetail.product.brand.name.toUpperCase()} ${productExists.name.toUpperCase()}' no tiene existencias en inventario`
          );
      })
    );

    const subtotalArray = sale_detail.map(
      (saleDetail: SaleDetail) => saleDetail.amount * saleDetail.price
    );
    const total = subtotalArray.reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
      0
    );

    const sale = new Sale({
      user,
      customer,
      sale_location,
      total,
      payment_method,
      sale_status,
      registration_date,
      sale_detail,
    });
    const storedSale = await sale.save();

    for (const saleDetail of sale_detail) {
      const storedProduct = await Product.findById(
        saleDetail.product.product_mongo_id
      );

      if (storedProduct && storedProduct.stock !== undefined) {
        storedProduct.stock -= saleDetail.amount;
      }

      await storedProduct?.save();
    }

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
