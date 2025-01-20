import { Response, Request, NextFunction } from 'express';
import { UserService } from '../../application/services/user.service';
import ResponseHandler from '../../util/responseHandler';
import CustomErrorHandler from '../../util/customErrorHandler';

export class UserController {
  constructor(private userService: UserService) {}
  async create(req: Request, res: Response, next: NextFunction) {

    try {
      const user = await this.userService.create(req.body);
       ResponseHandler.success(res,user,'User Create SucessFully',201)
    } catch (error) {
      next(error);
    }
  }

  
}
