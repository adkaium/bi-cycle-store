import { Router } from 'express';
import { userController } from './user.controller';

const router = Router();

router.post('/register', userController.createUser);
router.post('/createAdmin', userController.createAdmin);

router.post('/login');

export const UserRouter = router;
