import { NextFunction, Request, Response } from 'express';

export const notFound = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(400).json({
    seccess: false,
    message: 'API NOT FOUND',
  });
};
