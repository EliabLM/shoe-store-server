import { Router } from 'express';

// Controllers
import {
  createUser,
  signIn,
  readUsers,
  deleteUser,
  updateUser,
} from '@controllers/users';

// Middlewares
import { validatorHandler } from '@middlewares/index';

// Schemas
import {
  createUserSchema,
  updateUserSchema,
  loginSchema,
} from './users.schemas';

export const usersRouter = Router();

// Crear usuarios
usersRouter.post(
  '/create-user',
  validatorHandler(createUserSchema, 'body'),
  createUser
);

// Obtener usuarios
usersRouter.get('/get-users', readUsers);

// Autenticar usuario
usersRouter.post('/login', validatorHandler(loginSchema, 'body'), signIn);

// Eliminar usuario
usersRouter.put('/delete-user', deleteUser);

// Actualizar usuario
usersRouter.put(
  '/update-user',
  validatorHandler(updateUserSchema, 'body'),
  updateUser
);
