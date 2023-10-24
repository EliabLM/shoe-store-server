import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Category from '@models/categories/Category.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  try {
    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      throw boom.badRequest('La categoría ya se encuentra registrada');
    }

    const category = new Category(req.body);

    const storedCategory = await category.save();

    const resCreateCategory: IResponse = {
      statusCode: 201,
      message: 'Categoría creada exitosamente',
      data: {
        name: storedCategory.name,
      },
    };

    return res.status(201).json(resCreateCategory);
  } catch (error) {
    next(error);
  }
};
