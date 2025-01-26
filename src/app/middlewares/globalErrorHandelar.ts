/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';

import { TErrorSources } from '../interface/error';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';
import handleCastError from '../errors/handleCastError';

export const globalErrorHandelar: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'something is wrong!';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Somethig is Wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifideError = handleZodError(err);
    statusCode = simplifideError.statusCode;
    message = simplifideError.message;
    errorSources = simplifideError.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifideError = handleCastError(err);
    statusCode = simplifideError.statusCode;
    message = simplifideError.message;
    errorSources = simplifideError.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    seccess: false,
    message,
    errorSources,
    // err,
    // stack: config?.node_env === 'devlopment' ? err?.stack : null,
  });
};
