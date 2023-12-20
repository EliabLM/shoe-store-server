import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Models
import Supplier from '@models/supplier/Supplier.model';
import Purchase from '@models/purchases/Purchase.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const deleteSupplier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { supplier_id } = req.query;

    const supplier = await Supplier.findById(supplier_id);
    if (!supplier) throw boom.notFound('No existe el proveedor');

    const purchases = await Purchase.find({ supplier: supplier_id });

    if (purchases.length > 0) {
      throw boom.badRequest(
        'No es posible eliminar el proveedor porque tiene compras asociadas, primero elimine las compras asociadas y luego proceda a eliminar el proveedor.'
      );
    }

    await Supplier.findByIdAndDelete(supplier_id);

    const resDeleteSupplier: IResponse = {
      statusCode: 200,
      message: 'Proveedor eliminado exitosamente',
      data: null,
    };

    res.json(resDeleteSupplier);
  } catch (error) {
    next(error);
  }
};
