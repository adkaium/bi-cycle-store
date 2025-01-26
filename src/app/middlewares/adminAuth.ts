/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

const JWT_SECRET = config.jwt_access_secret || 'your_jwt_secret';

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(403).json({
      success: false,
      message: 'Forbidden: No token provided',
      statusCode: 403,
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as {
      _id: string;
      role: string;
    };

    if (decodedToken.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required',
        statusCode: 403,
      });
      return;
    }

    // Attach user info to the request object for further use
    req.user = decodedToken;

    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid token',
      statusCode: 401,
    });
  }
};
