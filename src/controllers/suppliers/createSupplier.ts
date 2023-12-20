import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Supplier from '@models/supplier/Supplier.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const createSupplier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.body;

  try {
    const supplierExists = await Supplier.findOne({ code });

    if (supplierExists) {
      throw boom.badRequest('El proveedor ya se encuentra registrado');
    }

    const supplier = new Supplier(req.body);

    const storedSupplier = await supplier.save();

    const resCreateSupplier: IResponse = {
      statusCode: 201,
      message: 'Proveedor creado exitosamente',
      data: {
        name: storedSupplier.name,
        email: storedSupplier.email,
        contact: storedSupplier.contact,
        code: storedSupplier.code,
      },
    };

    return res.status(201).json(resCreateSupplier);
  } catch (error) {
    next(error);
  }
};
