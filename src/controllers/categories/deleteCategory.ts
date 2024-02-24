import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Models
import Category from '@models/categories/Category.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category_id } = req.query;

    const category = await Category.findById(category_id);
    if (!category) throw boom.notFound('No existe la categoría');

    await Category.findByIdAndDelete(category_id);

    const resDeleteBrand: IResponse = {
      statusCode: 200,
      message: 'Categoría eliminada exitosamente',
      data: null,
    };

    res.json(resDeleteBrand);
  } catch (error) {
    next(error);
  }
};
