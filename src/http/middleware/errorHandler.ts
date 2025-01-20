import { Request, Response, NextFunction } from 'express';
import { Config } from '../../config';
import CustomErrorHandler from '../../util/customErrorHandler';
import logger from '../../config/logger';

class ErrorHandler {
  static errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    let statusCode = 500;
    let status = 'error';
    let data: any = {
      message: 'Internal Server Error',
      ...(Config.NODE_ENV === 'dev' && { originalError: err.stack }),
    };

    if (err instanceof CustomErrorHandler) {
      statusCode = err.statusCode;
      data = {
        message: err.message,
        ...(err.errors.length && { errors: err.errors }),
      };
    }

    logger.error(err.message);
    res.status(statusCode).json({ ...data, status });
  }
}

export default ErrorHandler;
