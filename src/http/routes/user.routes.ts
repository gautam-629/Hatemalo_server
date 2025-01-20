import { NextFunction, Router,Request,Response } from 'express';
import { UserRepository } from '../../infrastructure/database/pgSql/repository/user.repository';
import { UserService } from '../../application/services/user.service';
import { UserController } from '../controller';
import SchemaValidator from '../middleware/schemaValidator';
import { createUserSchema } from '../../application/dtos/user.dtos';

const userRepository=new UserRepository()
const userService=new UserService(userRepository)
const userController= new UserController(userService)
export const userRouter = (router: Router): void => {
    router.post('/create',
      SchemaValidator.validate(createUserSchema), 
       (req:Request, res:Response, next:NextFunction) => userController.create(req, res, next));
  };
