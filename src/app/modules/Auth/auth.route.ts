import express from 'express';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';

import { USER_ROLE } from '../user/user.constant';
import { auth } from '../../middlewares/auth';
import { validationRequest } from '../../middlewares/validatioRequest';

const router = express.Router();

router.post(
  '/login',
  validationRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validationRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  validationRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
