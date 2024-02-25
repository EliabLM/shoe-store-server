import { NextFunction, Request, Response } from 'express';

// Model
import Sale from '@models/sales/Sale.model';

// Interfaces
import { IResponse } from '../../interfaces';

export interface ISale {
  user: User;
  customer?: Customer;
  payment_method: PaymentMethod;
  sale_location: SaleLocation;
  _id: string;
  total: number;
  registration_date: string;
  sale_status: string;
  sale_detail: SaleDetail[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  names: string;
  code: string;
  email: string;
  role: string;
  user_id: string;
}

export interface Customer {
  names: string;
  code: string;
  email?: string;
  contact?: string;
  customer_id: string;
}

export interface PaymentMethod {
  name: string;
  payment_method_id: string;
}

export interface SaleLocation {
  name: string;
  description: string;
  sale_location_id: string;
}

export interface SaleDetail {
  product: Product;
  price: number;
  amount: number;
  subtotal: number;
  _id: string;
}

export interface Product {
  brand: Brand;
  product_id: number;
  product_mongo_id: string;
  categories: Category[];
  name: string;
  description: string;
  stock: number;
  initial_price: number;
}

export interface Brand {
  name: string;
  brand_id: string;
}

export interface Category {
  name: string;
  category_id: string;
  _id: string;
}

export const getAllSales = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sale_status } = req.query;

    let sales: ISale[];
    if (sale_status) {
      sales = await Sale.find({ sale_status });
    } else {
      sales = await Sale.find();
    }

    const allSales = sales.map((sale) => ({
      id: sale._id,
      user: sale.user,
      customer: sale.customer ?? null,
      sale_location: sale.sale_location,
      total: sale.total,
      payment_method: sale.payment_method,
      sale_status: sale.sale_status,
      registration_date: sale.registration_date,
      sale_detail: sale.sale_detail,
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt,
    }));

    const response: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: allSales,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
