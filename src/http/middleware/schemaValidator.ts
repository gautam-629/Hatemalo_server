import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import CustomErrorHandler from '../../util/customErrorHandler';

export function validationMiddleware(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToClass(dtoClass, req.body);
    const errors = await validate(dtoObj, { 
      whitelist: true,
      forbidNonWhitelisted: true 
    });

    if (errors.length > 0) {
      const validationErrors = errors.map((error: ValidationError) => {
        return Object.values(error.constraints || {});
      }).flat();
      
      next(new CustomErrorHandler(400, 'Validation Error', validationErrors));
    } else {
      req.body = dtoObj;
      next();
    }
  };
}