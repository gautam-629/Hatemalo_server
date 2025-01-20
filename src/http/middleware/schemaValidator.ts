import { NextFunction, Request, Response } from 'express';
import { ZodSchema, ZodError } from 'zod';
import CustomErrorHandler from '../../util/customErrorHandler';

class SchemaValidator {
  static validate(schema: ZodSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error:any) {
        if (error instanceof ZodError) {
          next(new CustomErrorHandler(400, 'Validation Error', error.errors.map((error)=>error.message)));
        } else {
          next(error);
        }
      }
    };
  }
}

export default SchemaValidator;
