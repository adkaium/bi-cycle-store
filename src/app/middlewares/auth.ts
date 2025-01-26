/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';


export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next): Promise<void> => {
    try {
      let token = req.headers.authorization;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
        throw new AppError(404, 'not Authorized');
      }

      const decoded: any = jwt.verify(
        token as string,
        config.jwt_access_secret || 'secret',
      );

      const user = await User.findById(decoded.id);

      if (!user || user.isBlocked) {
        throw new AppError(404, 'not Authorized');
      }

      req.user = user; // Attach user to request object
      next();
    } catch (error: any) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  });
};
