import { Router } from 'express';
import { createUser } from '@api/usuarios/controllers';
import { readUsers } from '@api/usuarios/controllers';

export const usersRouter = Router();

usersRouter.post('/create-user', createUser);
usersRouter.get('/get-users', readUsers);
