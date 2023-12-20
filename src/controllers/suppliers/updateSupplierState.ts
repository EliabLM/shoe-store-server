import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Supplier from '@models/supplier/Supplier.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const updateSupplierState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { supplier_id, active } = req.query;

    const supplier = await Supplier.findByIdAndUpdate(
      supplier_id,
      { active },
      { new: true }
    );

    if (!supplier) throw boom.notFound('No se encontró el proveedor');

    const response: IResponse = {
      statusCode: 200,
      message: 'Estado actualizado exitosamente',
      data: {
        name: supplier.name,
        code: supplier.code,
        email: supplier.email,
        contact: supplier.contact,
      },
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
