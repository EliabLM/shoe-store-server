import { Router } from 'express';
import create from './controllers/create.usuarios';

const router = Router();

router.post('/create-user', create);

export default router;
