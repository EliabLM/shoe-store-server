import { Router } from 'express';

// Controllers
import { createUser, signIn, readUsers } from '@api/usuarios/controllers';

// Middlewares
import { validatorHandler } from '@middlewares/index';

// Schemas
import { createUserSchema, loginSchema } from './schemas.usuarios';
import { deleteUser } from './controllers/deleteUser.usuarios';

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
