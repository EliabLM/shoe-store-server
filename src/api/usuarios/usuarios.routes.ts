import { Router } from 'express';
import { createUser, signIn, readUsers } from '@api/usuarios/controllers';

export const usersRouter = Router();

// Crear usuarios
usersRouter.post('/create-user', createUser);

// Obtener usuarios
usersRouter.get('/get-users', readUsers);

// Autenticar usuario
usersRouter.post('/login', signIn);
